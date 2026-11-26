import { describe, expect, it, vi } from "vitest";
import { VALIDATION_COPY as M } from "@/data/forms";
import {
  cleanPhoneInput,
  focusFirstError,
  validateContactEnquiry,
  validateEmail,
  validateHomepageEnquiry,
  validateIndianMobile,
  validateName,
} from "./formValidation";

const form = (fields: Record<string, string | string[]>) => {
  const fd = new FormData();
  for (const [k, v] of Object.entries(fields)) for (const item of [v].flat()) fd.append(k, item);
  return fd;
};

describe("cleanPhoneInput", () => {
  it("should keep digits, +, spaces and hyphens only", () => {
    expect(cleanPhoneInput("+91 (98765)-43210abc")).toBe("+91 98765-43210");
  });

  it("should cap at 16 characters", () => {
    expect(cleanPhoneInput("1".repeat(30))).toHaveLength(16);
  });
});

describe("validateIndianMobile (frontend copy)", () => {
  it.each(["9876543210", "+91 98765 43210", "09876543210"])("should accept %j", (v) => {
    expect(validateIndianMobile(v)).toBeNull();
  });

  it.each([
    ["", M.phoneRequired],
    ["98x6543210", M.phoneCharacters],
    ["98765", M.phoneLength],
    ["1234567890", M.phoneStart],
  ])("should reject %j", (v, msg) => {
    expect(validateIndianMobile(v)).toBe(msg);
  });

  it("should use the copy passed in (localised messages)", () => {
    expect(validateIndianMobile("", { ...M, phoneRequired: "फ़ोन ज़रूरी है" })).toBe("फ़ोन ज़रूरी है");
  });
});

describe("validateEmail (frontend copy)", () => {
  it.each([
    ["", M.emailRequired],
    ["a b@x.com", M.emailSpaces],
    ["ax.com", M.emailOneAt],
    ["@x.com", M.emailNameMissing],
    ["a..b@x.com", M.emailDots],
    ["a@x", M.emailDomain],
    [`${"a".repeat(65)}@x.com`, M.emailTooLong],
  ])("should reject %j", (v, msg) => {
    expect(validateEmail(v)).toBe(msg);
  });

  it("should accept a normal address", () => {
    expect(validateEmail("ravi+test@company.co.in")).toBeNull();
  });
});

describe("validateName", () => {
  it.each([
    ["", M.nameRequired],
    ["R", M.nameTooShort],
    ["x".repeat(101), M.nameTooLong],
    ["Ravi 2", M.nameNumbers],
    ["<b>Ravi", M.nameLetters],
  ])("should reject %j", (v, msg) => {
    expect(validateName(v)).toBe(msg);
  });
});

describe("validateHomepageEnquiry", () => {
  const valid = { name: "Ravi", phone: "9876543210", email: "r@x.com", message: "" };

  it("should return no errors for a valid form", () => {
    expect(validateHomepageEnquiry(form(valid))).toEqual({});
  });

  it("should flag every missing field when the form is empty", () => {
    expect(Object.keys(validateHomepageEnquiry(new FormData())).sort()).toEqual(["email", "name", "phone"]);
  });

  it("should cap the message at 2000 characters", () => {
    expect(validateHomepageEnquiry(form({ ...valid, message: "x".repeat(2000) }))).toEqual({});
    expect(validateHomepageEnquiry(form({ ...valid, message: "x".repeat(2001) }))).toEqual({
      message: "Keep it under 2000 characters.",
    });
  });
});

describe("validateContactEnquiry", () => {
  const OTHER = "Something else";
  const valid = {
    service: ["Web development"],
    name: "Ravi",
    company: "Acme",
    phone: "9876543210",
    email: "r@x.com",
    city: "Kolkata",
    timeframe: "This month",
  };

  it("should return no errors for a valid form", () => {
    expect(validateContactEnquiry(form(valid), OTHER)).toEqual({});
  });

  it("should require at least one non-empty service", () => {
    expect(validateContactEnquiry(form({ ...valid, service: [""] }), OTHER).service).toBe(M.serviceRequired);
  });

  it("should require the other-service text only when the Other label is ticked", () => {
    expect(validateContactEnquiry(form({ ...valid, service: ["Web", OTHER] }), OTHER).otherService).toBe(
      "The service you need is required.",
    );
    expect(validateContactEnquiry(form({ ...valid, service: ["Web", OTHER], otherService: "AR app" }), OTHER)).toEqual({});
  });

  it("should fill the field label and limit into text messages", () => {
    const errors = validateContactEnquiry(form({ ...valid, company: "", city: "x".repeat(151) }), OTHER);
    expect(errors.company).toBe("Company is required.");
    expect(errors.city).toBe("Keep it under 150 characters.");
  });

  it("should require a timeframe", () => {
    expect(validateContactEnquiry(form({ ...valid, timeframe: "  " }), OTHER).timeframe).toBe(M.timeframeRequired);
  });
});

describe("focusFirstError", () => {
  it("should do nothing when there are no errors", () => {
    const formEl = { elements: { namedItem: vi.fn() } } as unknown as HTMLFormElement;
    focusFirstError(formEl, {});
    expect(formEl.elements.namedItem).not.toHaveBeenCalled();
  });

  it("should focus the first field with an error", () => {
    const focus = vi.fn();
    vi.stubGlobal("RadioNodeList", class {});
    const namedItem = vi.fn().mockReturnValue({ focus });
    const formEl = { elements: { namedItem } } as unknown as HTMLFormElement;

    focusFirstError(formEl, { phone: "x", email: "y" });

    expect(namedItem).toHaveBeenCalledWith("phone");
    expect(focus).toHaveBeenCalled();
  });
});
