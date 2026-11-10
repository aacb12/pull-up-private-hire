# Pull Up Private Hire website

One-page site for Pull Up Private Hire (airport transfers and long-distance journeys from Glasgow), plus a privacy page. It uses the same branding, fonts and components as [Pull Up Driving School](https://pullupdrivingschool.co.uk/) (`../pull-up-driving-school`).

Plain HTML/CSS/JS, no build step. Open `index.html` or run `python3 -m http.server` in this folder.

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

## Still to do before going live (check with Siraj)

- **Domain.** `pullupprivatehire.co.uk` is a placeholder in `index.html` (canonical, og tags, structured data), `privacy/index.html`, `robots.txt` and `sitemap.xml`.
- **Contact details.** Phone, WhatsApp and email are the driving school's (07741 405694, puotl@outlook.com), in `index.html`, `script.js` and `privacy/index.html`. Change them if the private hire side uses different ones.
- **Licence.** The page says "Licensed private hire driver and car". Confirm this, and add the council licence number if he wants it shown.
- **Promises on the page.** Confirm he's happy to offer each one: flight tracking, early and late pick-ups, help with bags, smoke-free car, comfort stops on long trips, WhatsApp updates before pick-up. The FAQ answer on child seats says to ask.
- **Business name.** The privacy policy names "Pull Up Private Hire" only. Add the limited company name and number if it trades through one (e.g. Pull Up Driving Ltd).
- **Photos.** There's no photo of the private hire car yet. A photo of the car (and of him with it) would strengthen the "Your car" section.
- **Prices.** None are shown. If he wants "from £X" prices on the airport and route cards, get a list from him.
- **Terms and conditions.** Not written yet. They need his cancellation, waiting time and payment policy.
- **Hosting.** Set up like the driving school: a GitHub repo, deployed by Cloudflare Pages on every push to `main`.
