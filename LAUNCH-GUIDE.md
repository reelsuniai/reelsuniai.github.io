# Launch guide: selling your Claude skills

## 1. What you have now
- `index.html` is the sales page: hero, how it works, 5 skill cards, the ₹999 bundle, results, FAQ and a sticky "buy" bar on mobile.
- `policies.html` holds your Terms, Privacy, Refund and Contact sections. Superprofile and Razorpay often ask for these.
- **You edit one place only:** the `CONFIG` block near the bottom of `index.html`. It holds names, prices, checkout links and previews.
- Until you paste a checkout link, each button says **"Coming soon · Notify me"** and opens your Instagram DMs. So you can go live today and collect interest.

## 2. Hosting (free, already set up)
`reelsuniai.github.io` is GitHub Pages: free hosting with HTTPS included.
1. Merge this branch into `main`. The site updates about 1 minute later.
2. Check repo **Settings → Pages**. The source should be "Deploy from branch: main / root".

## 3. Custom domain (optional, about ₹800–1,200 a year)
You don't need one to start. `reelsuniai.github.io` works fine. When you want a brand domain:
1. **Buy** it from Cloudflare Registrar (sold at cost, about $10 a year for .com), Namecheap or Porkbun. Avoid GoDaddy, which is cheap the first year and expensive at renewal. Ideas: `shortsuniversity.com`, `reelsuni.ai`, `shortsuniversity.in`. Note that `.ai` costs about $70 a year or more.
2. In your domain's **DNS settings**, add:
   - 4 × `A` records for `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` for `www` → `reelsuniai.github.io`
3. In GitHub, open **Settings → Pages → Custom domain**, type your domain, save, and tick **Enforce HTTPS** once it turns on (up to 24 hours).
4. Verify the domain under **GitHub Settings → Pages → Verified domains**. This stops anyone else from taking it over.
5. Update the link in your Instagram bio.

## 4. Superprofile setup (launch week)
1. Sign up at superprofile.bio. Complete **KYC** (PAN, bank account, and Aadhaar if asked) so payouts work.
2. Create **6 digital products**: the 5 single skills at ₹499 each, plus the bundle at ₹999.
3. For each one, upload the **zipped skill folder**, a **setup PDF or video link**, and a cover image (use a still from your reels).
4. Turn on: email delivery, UPI and cards, and a **limited download count** if they offer one.
5. Copy each product's public link and paste it into `CONFIG` in `index.html` (`checkout: "https://..."`). Commit and the buttons go live.
6. **Test-buy one product yourself** (use a ₹1 test product if they allow it) before you announce.

## 5. What to put in each skill zip
```
paper-desk-skill/
  SKILL.md          ← the skill instructions Claude reads
  assets/           ← fonts, textures, music, sample images
  templates/        ← Remotion/scene code the skill reuses
  README.pdf        ← install steps with screenshots
  prompts.txt       ← 20 ready-to-use example prompts
  LICENSE.txt       ← "personal licence, do not redistribute"
```
Before you sell, test each zip on a **clean computer or a fresh Claude account**. Most refund requests come from missing setup steps.

## 6. Is it safe? (risks, honestly)
| Concern | Reality | What to do |
|---|---|---|
| Site hacking | The site is plain HTML with no database and no logins, so there is nothing to hack. | Turn on **2FA on GitHub** and Instagram. |
| Payments | You never touch card data. Superprofile and its payment gateway (Razorpay/Cashfree) handle it. | Only share links from your real Superprofile dashboard. |
| Piracy | Anyone who buys a skill can share the folder. Every digital-product seller faces this. | Add a buyer-name line to the README, update often (only buyers get updates), and offer DM support. Pirates don't get those. Price low, as you are. |
| Trademark | You can say "for Claude Code". Don't use Anthropic's logo, and don't imply you're official. | The footer disclaimer is already in `policies.html`. |
| Taxes (India) | Income from digital sales is taxable. GST registration becomes mandatory above ₹20 lakh a year (₹10L in some states). Selling services online may need GST from the start. | Keep Superprofile payout statements. Talk to a CA once sales start. |
| Fake "competitor" claims | Don't copy their names, art or text. | This page is original and in your brand. Keep it that way. |

## 7. Before you launch
- [ ] Rename the 5 skills in `CONFIG` to your real style names, and write a 1-line description for each.
- [ ] Record a **5–8 second loop** of each style, save it as `assets/<name>.mp4` (under 2 MB, muted), and set `preview: "assets/paper-desk.mp4"`.
- [ ] Replace `support@example.com` in `policies.html` with a support email. Use a separate Gmail, not your personal one.
- [ ] Update the proof numbers (495K views and so on) so they stay true.
- [ ] Paste the 6 Superprofile links into `CONFIG`.
- [ ] Test on your phone: tap every button.
- [ ] Post a launch reel with the CTA "Comment SKILL" and auto-DM the link (ManyChat or Instagram's built-in automation).

## 8. Ideas to sell more
- **Launch-week price:** the top bar already says the price goes up. Actually raise it later (for example, bundle ₹1,499), so the claim stays honest.
- **One free mini skill** as a lead magnet, in exchange for an email.
- Pin a reel that shows **"made with this skill in 20 minutes"** next to the finished result.
- Ask the first 10 buyers for a screenshot testimonial and add them to the page.
