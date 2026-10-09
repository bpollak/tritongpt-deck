# Citizen developer recordings — October 8, 2026

Both 50-second clips are actual browser screencast frames recorded through computer use. Takes are edited, cropped/scaled for legibility, and idle/processing time is shortened. Titles, status labels and explanatory captions are added outside the captured application. No app UI or result was synthesized. Each clip has a poster and English VTT captions. Burned-in explanations are always visible; optional native captions are initially off to avoid duplicate text over the app.

## Directory

Files: `cabinet-directory.mp4`, `cabinet-directory-poster.jpg`, `cabinet-directory.vtt`.

Source: [Directory web app](https://directory.apps.ucsd.edu/), verified October 8. The interface currently says Faculty Finder; the presentation uses Directory, following the Cabinet naming decision.

Scenario: enter a sample coastal-flooding, sea-level-rise and climate-adaptation expertise requirement; evaluate it; review extracted requirements and an actual generated alignment explanation; search the Expert Directory for coastal flooding; open a faculty profile. Public professional information is shown. No files were uploaded, people contacted, or faculty/funding decisions made. Scores are model-generated suggestions and not validated institutional evaluations. Source completeness, duplicate identities and arts/humanities coverage remain review topics. Status: in development; production rollout is not established by a reachable URL.

## Passport

Files: `cabinet-passport.mp4`, `cabinet-passport-poster.jpg`, `cabinet-passport.vtt`.

Sources: [official use-case page](https://tritonai.ucsd.edu/use-cases/passport-app.html), [production public entry point](https://passports.apps.ucsd.edu/), and [IPPS public repository](https://github.com/IPPS-TechPM-BSA/passports-app/tree/3c07442307aeff8b22ce79cf95358c86be0eb9b8). The official page describes a production service for CSC and Bookstore, with department staff building an initial app using AI-assisted tools and specialists preparing it for campus hosting.

Scenario: actual source runs locally with a fresh SQLite database and isolated demo authentication. A fictional Alex Demo visitor chooses CSC/walk-in/Passport, uses reserved example contact details, flags a missing photo, and completes check-in. Staff review the record, save a note, sign the visitor out, and inspect reporting. The database confirms one fictional signed-out record, the saved note and the missing-photo flag. All report counts/percentages are fictional demonstration data. No production queue/dashboard or visitor data was accessed or modified. Application UI/workflow source is unchanged from the checked-out commit; local runtime configuration was added. The checkout is not asserted to be the exact deployed production commit.

## Presentation framing

Campus workflow knowledge can become a focused app with review and ongoing ownership. Directory is a development example; Passport is a department-led production example demonstrated locally. Neither recording proves use of TritonAI Harness as the original builder tool. These app status labels are independent of the stable-versus-Nightly Harness labels elsewhere in the deck.
