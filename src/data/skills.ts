export interface Skill {
  skill: string;
  description: string;
  prompt_message: string;
  input_draft: string;
}

export interface SkillPack {
  name: string;
  icon: string;
  skills: Skill[];
}

const marketingSkills: Skill[] = [
  {
    skill: "ab-test-setup",
    description: "When the user wants to plan, design, or implement an A/B test or experiment. Also use when the user mentions \"A/B test\", \"split test\", \"experiment design\", or \"variant testing\".",
    prompt_message: "You selected **A/B Test Setup**. Please tell me:\n1) What page/flow do you want to test? (link or screenshot)\n2) What is your current baseline data (conversion rate / CTR / activation rate)?\n3) What hypothesis do you want to validate? (why it would improve)\n\nI will output: experiment hypothesis, variable definition, sample size/duration recommendation, tracking requirements, success criteria & retrospective template.",
    input_draft: "I want to run an A/B test on [page/flow], the target metric is [ ], the current baseline is [ ], and my hypothesis is [ ]."
  },
  {
    skill: "analytics-tracking",
    description: "When the user wants to set up, improve, or audit analytics tracking and measurement. Also use when the user mentions event tracking, UTM parameters, or data pipelines.",
    prompt_message: "You selected **Analytics Tracking**. Please share:\n1) What platform/tool are you using (GA4, Mixpanel, Amplitude, etc.)?\n2) What key events or funnels do you need to track?\n3) Any current pain points with your tracking setup?\n\nI will output: tracking plan, event taxonomy, implementation guide, and QA checklist.",
    input_draft: "I need help with analytics tracking for [ ], using [platform]. The key events I want to track are [ ]."
  },
  {
    skill: "competitor-alternatives",
    description: "When the user wants to create competitor comparison or alternative pages for SEO and sales enablement. Also use when the user needs competitive analysis.",
    prompt_message: "You selected **Competitor & Alternatives**. Please share:\n1) What is your product and who are your main competitors?\n2) What are your key differentiators?\n3) Is this for an SEO page, sales deck, or internal analysis?\n\nI will output: competitor matrix, positioning angles, page structure, and SEO-optimized copy framework.",
    input_draft: "I want to create a competitor comparison for [my product] vs [competitors]. Our key differentiators are [ ]."
  },
  {
    skill: "content-strategy",
    description: "When the user wants to plan a content strategy, decide what content to create, or figure out what topics to cover. Also use for editorial calendars and content planning.",
    prompt_message: "You selected **Content Strategy**. Please share:\n1) What is your product/service and target audience?\n2) What are your content goals (traffic, leads, authority)?\n3) What content formats are you considering?\n\nI will output: topic clusters, content calendar, distribution plan, and success metrics.",
    input_draft: "I need a content strategy for [product/service]. My target audience is [ ] and my main goal is [ ]."
  },
  {
    skill: "copy-editing",
    description: "When the user wants to edit, review, or improve existing marketing copy. Also use when the user mentions 'edit this copy', 'review this text', or 'improve this messaging'.",
    prompt_message: "You selected **Copy Editing**. Please share:\n1) The copy you want edited (paste or link)\n2) The target audience and tone of voice\n3) What specific aspects need improvement?\n\nI will output: edited copy with tracked changes, explanations for key edits, and alternative phrasings.",
    input_draft: "Please edit this copy: [ ]. The target audience is [ ] and the tone should be [ ]."
  },
  {
    skill: "copywriting",
    description: "When the user wants to write, rewrite, or improve marketing copy for any page — including homepage, landing pages, product pages, or ads.",
    prompt_message: "You selected **Copywriting**. Please share:\n1) What type of copy do you need (landing page, ad, email, etc.)?\n2) Target audience and their main pain points\n3) Key value proposition and desired action\n\nI will output: headline options, body copy, CTA variations, and messaging framework.",
    input_draft: "I need copy for [type], targeting [audience]. The main value prop is [ ] and the desired action is [ ]."
  },
  {
    skill: "email-sequence",
    description: "When the user wants to create or optimize an email sequence, drip campaign, automated email flow, or lifecycle email strategy.",
    prompt_message: "You selected **Email Sequence**. Please share:\n1) What is the goal of this sequence (onboarding, nurture, re-engagement)?\n2) Who is the target audience and trigger event?\n3) How many emails and over what timeframe?\n\nI will output: sequence map, subject lines, email copy drafts, timing recommendations, and A/B test suggestions.",
    input_draft: "I need an email sequence for [goal]. The trigger is [event], targeting [audience], over [timeframe]."
  },
  {
    skill: "form-cro",
    description: "When the user wants to optimize any form that is NOT signup/registration — including lead capture forms, contact forms, survey forms, or checkout forms.",
    prompt_message: "You selected **Form CRO**. Please share:\n1) Link to the form or describe its fields\n2) Current completion rate and drop-off points\n3) What is the form's purpose and target audience?\n\nI will output: field optimization recommendations, UX improvements, copy suggestions, and testing plan.",
    input_draft: "I want to optimize this form: [ ]. Current completion rate is [ ], the main drop-off is at [ ]."
  },
  {
    skill: "free-tool-strategy",
    description: "When the user wants to plan, evaluate, or build a free tool for marketing purposes — lead generation, SEO value, or brand awareness.",
    prompt_message: "You selected **Free Tool Strategy**. Please share:\n1) What is your product and target audience?\n2) What problem could a free tool solve for them?\n3) How should it tie back to your paid product?\n\nI will output: tool concepts, MVP scope, distribution strategy, conversion funnel, and success metrics.",
    input_draft: "I want to build a free tool for [audience]. My product is [ ] and the tool should help with [ ]."
  },
  {
    skill: "launch-strategy",
    description: "When the user wants to plan a product launch, feature announcement, or release strategy. Also use for go-to-market planning.",
    prompt_message: "You selected **Launch Strategy**. Please share:\n1) What are you launching and when?\n2) Who is the target audience?\n3) What channels and assets do you already have?\n\nI will output: launch timeline, channel strategy, messaging framework, checklist, and post-launch measurement plan.",
    input_draft: "I'm launching [product/feature] on [date]. Target audience is [ ] and available channels are [ ]."
  },
  {
    skill: "marketing-ideas",
    description: "When the user needs marketing ideas, inspiration, or strategies for their SaaS or software product. Also use for brainstorming sessions.",
    prompt_message: "You selected **Marketing Ideas**. Please share:\n1) What is your product and current stage (pre-launch, growth, mature)?\n2) What marketing have you tried so far?\n3) Budget range and team size\n\nI will output: prioritized idea list, effort/impact matrix, quick wins, and implementation roadmap.",
    input_draft: "I need marketing ideas for [product]. We're at [stage], budget is [range], and we've tried [ ]."
  },
  {
    skill: "marketing-psychology",
    description: "When the user wants to apply psychological principles, mental models, or behavioral science to marketing. Also use for persuasion and influence techniques.",
    prompt_message: "You selected **Marketing Psychology**. Please share:\n1) What marketing asset or flow are you optimizing?\n2) What behavior do you want to encourage?\n3) What is your target audience's mindset?\n\nI will output: applicable psychological principles, implementation examples, copy/UX suggestions, and ethical considerations.",
    input_draft: "I want to apply psychology to [asset/flow] to encourage [behavior]. My audience is [ ]."
  },
  {
    skill: "onboarding-cro",
    description: "When the user wants to optimize post-signup onboarding, user activation, first-run experience, or time-to-value.",
    prompt_message: "You selected **Onboarding CRO**. Please share:\n1) Current onboarding flow (steps/screens)\n2) Activation metric and current rate\n3) Where do users drop off most?\n\nI will output: flow redesign, checklist patterns, engagement triggers, measurement framework, and experiment ideas.",
    input_draft: "I want to optimize onboarding for [product]. Current activation rate is [ ], main drop-off is at [ ]."
  },
  {
    skill: "page-cro",
    description: "When the user wants to optimize, improve, or increase conversions on any marketing page — including homepage, landing pages, pricing pages.",
    prompt_message: "You selected **Page CRO**. Please share:\n1) URL of the page to optimize\n2) Current conversion rate and goal\n3) Traffic source and volume\n\nI will output: page audit, priority fixes, copy improvements, layout suggestions, and A/B test roadmap.",
    input_draft: "I want to optimize [page URL]. Current conversion rate is [ ], goal is [ ], traffic comes from [ ]."
  },
  {
    skill: "paid-ads",
    description: "When the user wants help with paid advertising campaigns on Google Ads, Meta (Facebook/Instagram), LinkedIn, Twitter/X, or other platforms.",
    prompt_message: "You selected **Paid Ads**. Please share:\n1) Platform (Google / Meta / LinkedIn etc.) and target country\n2) Product price point / conversion goal (signup / purchase / lead)\n3) Current budget, creatives, landing page link, and historical data (if any)\n\nI will output: account structure, audience & keyword strategy, creative direction, landing page suggestions, testing plan & optimization cadence.",
    input_draft: "I want to run ads on [platform], targeting [ ], budget is [ ], target country is [ ], landing page is [ ]."
  },
  {
    skill: "paywall-upgrade-cro",
    description: "When the user wants to create or optimize in-app paywalls, upgrade screens, upsell modals, or feature gates.",
    prompt_message: "You selected **Paywall & Upgrade CRO**. Please share:\n1) Current paywall/upgrade UI (screenshot or description)\n2) Free-to-paid conversion rate\n3) Pricing tiers and key gated features\n\nI will output: paywall redesign, copy optimization, trigger timing, psychological principles, and testing plan.",
    input_draft: "I want to optimize the paywall for [product]. Current conversion is [ ], pricing is [ ]."
  },
  {
    skill: "popup-cro",
    description: "When the user wants to create or optimize popups, modals, overlays, slide-ins, or banners for conversion purposes.",
    prompt_message: "You selected **Popup CRO**. Please share:\n1) What type of popup (exit-intent, timed, scroll-triggered)?\n2) Goal (email capture, discount, announcement)?\n3) Current popup performance if any\n\nI will output: popup strategy, copy, design direction, trigger rules, and A/B test plan.",
    input_draft: "I need a [type] popup for [goal]. Current performance is [ ]."
  },
  {
    skill: "pricing-strategy",
    description: "When the user wants help with pricing decisions, packaging, or monetization strategy.",
    prompt_message: "You selected **Pricing Strategy**. Please share:\n1) What is your product and current pricing?\n2) Target customer segments\n3) Competitor pricing landscape\n\nI will output: pricing model options, tier structure, feature packaging, migration plan, and validation methods.",
    input_draft: "I need help with pricing for [product]. Current pricing is [ ], competitors charge [ ]."
  },
  {
    skill: "product-marketing-context",
    description: "When the user wants to create or update their product marketing context document. Also use for positioning and messaging frameworks.",
    prompt_message: "You selected **Product Marketing Context**. Please share:\n1) What is your product and who is it for?\n2) Key features and unique value proposition\n3) Current positioning statement (if any)\n\nI will output: positioning document, messaging matrix, ICP definition, competitive angles, and elevator pitches.",
    input_draft: "I need a product marketing context doc for [product]. It helps [audience] by [ ]."
  },
  {
    skill: "programmatic-seo",
    description: "When the user wants to create SEO-driven pages at scale using templates and data.",
    prompt_message: "You selected **Programmatic SEO**. Please share:\n1) What type of pages do you want to generate at scale?\n2) What data source will power these pages?\n3) Target keywords or keyword patterns\n\nI will output: page template design, data schema, URL structure, internal linking strategy, and quality controls.",
    input_draft: "I want to create programmatic SEO pages for [type]. Data source is [ ], targeting [keyword pattern]."
  },
  {
    skill: "referral-program",
    description: "When the user wants to create, optimize, or analyze a referral program, affiliate program, or word-of-mouth strategy.",
    prompt_message: "You selected **Referral Program**. Please share:\n1) What is your product and current growth channels?\n2) What incentives can you offer (both sides)?\n3) Current viral coefficient or referral rate (if known)\n\nI will output: program structure, incentive design, viral loop mechanics, tracking setup, and launch plan.",
    input_draft: "I want to create a referral program for [product]. Possible incentives are [ ]."
  },
  {
    skill: "schema-markup",
    description: "When the user wants to add, fix, or optimize schema markup and structured data on their site.",
    prompt_message: "You selected **Schema Markup**. Please share:\n1) Your website URL and page types\n2) What rich results are you targeting?\n3) Current schema implementation (if any)\n\nI will output: schema recommendations, JSON-LD code snippets, validation checklist, and rich result opportunities.",
    input_draft: "I need schema markup for [website]. Page types include [ ], targeting [rich results]."
  },
  {
    skill: "seo-audit",
    description: "When the user wants to audit, review, or diagnose SEO issues on their site. Also use when the user mentions \"SEO audit\", \"SEO review\", or \"SEO analysis\".",
    prompt_message: "You selected **SEO Audit**. Please share:\n1) Your website / core page URLs\n2) Target country/language and core keywords\n3) Current biggest concern: traffic drop / low indexing / unstable rankings / poor conversions?\n\nI will output: technical SEO checklist, content & structure issues, priority fix plan & measurable targets.",
    input_draft: "I want an SEO audit for [ ], target keywords/country are [ ], current issue is [ ]."
  },
  {
    skill: "signup-flow-cro",
    description: "When the user wants to optimize signup, registration, account creation, or trial activation flows.",
    prompt_message: "You selected **Signup Flow CRO**. Please share:\n1) Current signup flow (steps and fields)\n2) Signup conversion rate and main drop-off point\n3) What authentication methods do you support?\n\nI will output: flow optimization, field reduction strategy, social proof placement, and testing plan.",
    input_draft: "I want to optimize the signup flow for [product]. Current conversion is [ ], drop-off is at [ ]."
  },
  {
    skill: "social-content",
    description: "When the user wants help creating, scheduling, or optimizing social media content for LinkedIn, Twitter/X, Instagram, or other platforms.",
    prompt_message: "You selected **Social Content**. Please share:\n1) Which platforms and your current audience size?\n2) Content goals (brand awareness, leads, engagement)?\n3) Your brand voice and content themes\n\nI will output: content calendar, post templates, hashtag strategy, engagement tactics, and performance benchmarks.",
    input_draft: "I need social content for [platforms]. Audience size is [ ], goal is [ ], brand voice is [ ]."
  }
];

export const skillPacks: SkillPack[] = [
  {
    name: "Marketing Skills",
    icon: "📊",
    skills: marketingSkills,
  }
];

export const mockFiles = [
  { name: ".claude", type: "folder" as const, modified: "2 hours ago" },
  { name: "marketing-output", type: "folder" as const, modified: "2 hours ago" },
  { name: "campaigns", type: "folder" as const, modified: "1 day ago" },
  { name: "analytics-report.md", type: "file" as const, modified: "3 hours ago" },
  { name: "seo-audit-results.json", type: "file" as const, modified: "5 hours ago" },
  { name: "ad-copy-drafts.txt", type: "file" as const, modified: "1 day ago" },
];
