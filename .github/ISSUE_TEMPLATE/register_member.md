---
name: Register New Member
about: Submit a request for new member to be added to the Earth Metabolome Initiative.
labels: "new member"
title: "I'd like to join the Earth Metabolome Initiative"
assignees: "@earth-metabolome-initiative/core"
---

Please update the template below and click "Create" to let us know you'd like to become a member of the Earth Metabolome Initiative. Please allow for some time for @earth-metabolome-initiative/core to review your request.


This is a template for registering a new member of the Earth Metabolome Initiative. Please fill in the details below and remove this line before submitting. For Wikidata just provide the QID (e.g., `Q20650434`) and the site will build both Wikidata and Scholia links automatically. When sharing your profile photo, drag-and-drop the image **outside** the code block below (after the closing ``` line) so editors can easily download it; leave the `thumbnail.url` blank unless you already host the photo at a stable public URL. For the `popupLat`/`popupLong` fields you can use open tools such as https://www.openstreetmap.org (right-click → “Show address”) or https://nominatim.openstreetmap.org to copy the coordinates of your home institution.

```
---
title: Donat Agosti
firstname: Donat
lastname: Agosti
institution: Plazi, Switzerland
orcid: https://orcid.org/0000-0001-9286-1200
wikidata: Q20650434
website: https://plazi.org
thumbnail:
  url: "" # leave blank if you attach your photo below; otherwise add a direct https:// link
popup: "Here I am"
popupLat: 52.5127 # latitude of your home institution (copy from OpenStreetMap/Nominatim)
popupLong: 13.3992 # longitude of your home institution
---

Donat is Swiss myrmecologist and open access activist. 

## Collaboration statement

I am interested in contributing to the Earth Metabolome Initiative by providing my expertise in myrmecology and open access advocacy. My experience at [Plazi](https://plazi.org/), where I work on digitizing and making biodiversity data accessible, aligns with the goals of the Earth Metabolome Initiative to promote open science and data sharing.

I foresee the following contributions:
- Providing expertise in litterature digitization and data management.
- Help in taxonomical identification of insects.
- Help in collection of insect samples.



```

<!-- Drag & drop your profile photo(s) right below this line (outside the code block). -->

Editors @earth-metabolome-initiative/core: please see https://github.com/open-traits-network/open-traits-network.github.io/tree/master/_members#readme for information on registration process.

Maintainer checklist:
- Download the attached photo (just below the template), move it to `static/img/members/`, and update `thumbnail.url` accordingly.
- Copy the submitted front matter into `content/members/firstname-lastname.md` (lowercase, hyphenated).
- Run `npm run member:prepare -- content/members/firstname-lastname.md` to add the default `modules`/`type` entries.
