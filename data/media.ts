// The website's default pictures live in the Hostinger media folder (the same files as public/, uploaded with
// `npm run upload:frontend-media` in Tech-Vedha-Admin and listed in its Media Library). Pages and the admin load them
// from there, so the admin's previews show them too. The copies in public/ stay as a spare.

/** Host of the Hostinger media folder: always allowed for images (next.config.ts, lib/adminApi.ts). */
export const MEDIA_HOST = "navajowhite-octopus-630288.hostingersite.com";

/** Site path of a bundled picture → its address in the Hostinger media folder. */
export const MEDIA: Readonly<Record<string, string>> = {
  "/brand/logo-dark.png": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581882463_fb3699e1_logo-dark.png",
  "/brand/logo-light.png": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581883815_eb7de53f_logo-light.png",
  "/home/avatars/builder.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581885140_5f9ed182_builder.jpg",
  "/home/avatars/clinic.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581886431_cf7053c9_clinic.jpg",
  "/home/avatars/homedecor.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581887731_84f95cc6_homedecor.jpg",
  "/home/avatars/manufacturing.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581889217_3a5902c4_manufacturing.jpg",
  "/home/avatars/retail.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581890765_b5c282aa_retail.jpg",
  "/home/avatars/showroom.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581892277_6fdc9f53_showroom.jpg",
  "/home/avatars/studio.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581893526_7c81c9e3_studio.jpg",
  "/home/enquiries-chart-dark.svg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581894947_134ca44f_enquiries-chart-dark.svg",
  "/home/enquiries-chart-light.svg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581896231_140b9370_enquiries-chart-light.svg",
  "/home/stories/3d-showroom.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581897295_1d505136_3d-showroom.jpg",
  "/home/stories/app-launch.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581898766_495d66cc_app-launch.jpg",
  "/home/stories/youtube-seo.jpg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581900120_f1b751ae_youtube-seo.jpg",
  "/home/wave-dark.svg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581901555_3fa893f9_wave-dark.svg",
  "/home/wave-light.svg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581902694_6ce2028a_wave-light.svg",
  "/services/campaign-chart.svg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581905481_f6c930d4_campaign-chart.svg",
  "/tools/canva.svg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581906801_6202eb50_canva.svg",
  "/tools/google-business-profile.svg": "https://navajowhite-octopus-630288.hostingersite.com/tech-vedha/media/1795581907952_02db1ccd_google-business-profile.svg",
};

/** The Hostinger address of a bundled picture (its site path when it isn't in the media folder). */
export const media = (path: string): string => MEDIA[path] ?? path;
