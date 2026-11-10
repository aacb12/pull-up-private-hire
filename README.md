# Pull Up Private Hire website

One-page site for Pull Up Private Hire (airport transfers and long-distance journeys from Glasgow), plus a privacy page. It uses the same branding, fonts and components as [Pull Up Driving School](https://pullupdrivingschool.co.uk/).

Plain HTML/CSS/JS, no build step. Open `index.html` or run `python3 -m http.server` in this folder.

Live at **https://aacb12.github.io/pull-up-private-hire/**

## Hosting

GitHub Pages serves the `main` branch of this public repo, so every push to `main` updates the live site within a minute or two. `.nojekyll` tells GitHub to serve the files as they are.

The site lives in a subfolder (`/pull-up-private-hire/`), so all links are relative. `404.html` is the exception: GitHub serves it at any missing URL, so it uses `<base href="/pull-up-private-hire/">` to find the stylesheet and images.

### Adding a domain later

1. Buy the domain, then in the repo go to **Settings → Pages → Custom domain** and enter it. Point its DNS at GitHub Pages as GitHub describes, then tick **Enforce HTTPS**.
2. Replace `https://aacb12.github.io/pull-up-private-hire/` with the new address in `index.html` (canonical, og tags, structured data), `privacy/index.html`, `robots.txt` and `sitemap.xml`.
3. In `404.html`, change `<base href="/pull-up-private-hire/">` to `<base href="/">`.
4. Update the footer link on the driving school site.

## How the quote form works

There's no backend. The quote form in the hero builds a message with the journey details (pick-up, drop-off, date, time, return, passengers, suitcases, flight number) and opens WhatsApp with it ready to send. "Or send by email instead" does the same with an email. The airport and route cards fill in the drop-off and jump to the form.

The car takes up to 4 passengers and 3 large suitcases, so the form only offers 1–4 and 0–3.

## Logo

`images/logo-header.png` and `images/logo-stacked.png` are the driving school logos with "DRIVING SCHOOL" replaced by "PRIVATE HIRE", set in Montserrat Italic to match the original lettering. The favicon and app icon are the same PU mark as the driving school. `images/og-image.jpg` is the preview picture shown when the link is shared.

## Checking layouts

`.preview/` (not committed) has helper pages for headless Chrome while `python3 -m http.server` is running:
- `.preview/full.html?w=390&h=11000` shows the whole page at phone width and reports anything wider than the screen
- `.preview/formtest.html` fills in and submits the quote form and prints the WhatsApp message

## Wording

The site says "private hire", not "taxi". In Scotland a taxi (hackney carriage) and a private hire car have different licences, and private hire journeys must be pre-booked.

## Still to check with the owner

- **Contact details.** Phone, WhatsApp and email are the driving school's (07741 405694, puotl@outlook.com), in `index.html`, `script.js` and `privacy/index.html`. Change them if the private hire side uses different ones.
- **Licence.** The page says "Licensed private hire driver and car". Confirm this, and add the council licence number if he wants it shown.
- **Promises on the page.** Confirm he's happy to offer each one: flight tracking, early and late pick-ups, help with bags, smoke-free car, comfort stops on long trips, WhatsApp updates before pick-up. The FAQ answer on child seats says to ask.
- **Business name.** The privacy policy names "Pull Up Private Hire" only. Add the limited company name and number if it trades through one (e.g. Pull Up Driving Ltd).
- **Photos.** There's no photo of the private hire car yet. A photo of the car (and of him with it) would strengthen the "Your car" section.
- **Prices.** None are shown. If he wants "from £X" prices on the airport and route cards, get a list from him.
- **Terms and conditions.** Not written yet. They need his cancellation, waiting time and payment policy.
- **Domain.** See "Adding a domain later" above.
