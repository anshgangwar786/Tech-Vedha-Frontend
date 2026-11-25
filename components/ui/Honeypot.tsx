/**
 * Spam trap for the enquiry forms. People never see or reach this field; bots that fill every input do, and
 * Tech-Vedha-Admin then answers "success" without saving the lead.
 * The name must match HONEYPOT_FIELD in Tech-Vedha-Admin/app/lib/server/enquiryLead.ts.
 */
export const HONEYPOT_FIELD = "tv_hp_ref";

export function Honeypot() {
  return (
    <div aria-hidden="true" className="absolute -left-[10000px] h-px w-px overflow-hidden">
      <label>
        Leave this field empty
        <input type="text" name={HONEYPOT_FIELD} tabIndex={-1} autoComplete="off" defaultValue="" />
      </label>
    </div>
  );
}
