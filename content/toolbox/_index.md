---
title: Toolbox
description: Tools developed by the Earth Metabolome Initiative
---

We build open-source tools, mostly in Rust, for computational mass spectrometry
and natural product drug discovery. Many run entirely in the browser, making
them easy to try, deploy, and reuse without moving data to a server.

{{< card-group cols="2" gutter="4" padding="4" header="none" footer="none" orientation="stacked" >}}
{{< card title="NPClassifier" icon="fas tags" >}}
Browser-side natural product classification from SMILES using Rust/WASM
NPClassifier models. Designed for fast, private classification without
uploading molecular structures.

<div class="d-flex flex-wrap gap-2 mt-3">
  <a class="btn btn-primary" href="https://npc.earthmetabolome.org/">Open service</a>
  <a class="btn btn-outline-primary" href="https://github.com/earth-metabolome-initiative/npclassifier-rs"><i class="fab fa-github me-1"></i> GitHub</a>
</div>
{{< /card >}}

{{< card title="PubChem Molecular Topology Explorer" icon="fas diagram-project" >}}
Interactive exploration of PubChem compound topology, supporting analysis of
molecular relationships and structural organization across large chemical
spaces.

<div class="d-flex flex-wrap gap-2 mt-3">
  <a class="btn btn-primary" href="https://topology.earthmetabolome.org/">Open service</a>
  <a class="btn btn-outline-primary" href="https://github.com/earth-metabolome-initiative/pubchem-topology"><i class="fab fa-github me-1"></i> GitHub</a>
</div>
{{< /card >}}

{{< card title="MGF SPLASH" icon="fas fingerprint" >}}
Compute SPLASH identifiers from Mascot Generic Format spectra directly in the
browser. Designed for quick, private generation of stable spectral identifiers.

<div class="d-flex flex-wrap gap-2 mt-3">
  <a class="btn btn-primary" href="https://splash.earthmetabolome.org/">Open service</a>
  <a class="btn btn-outline-primary" href="https://github.com/earth-metabolome-initiative/mgf-splash-app"><i class="fab fa-github me-1"></i> GitHub</a>
</div>
{{< /card >}}

{{< card title="Spectral Similarity Graph" icon="fas circle-nodes" >}}
Turn MGF files into interactive spectral similarity graphs, clustered and laid
out directly in the browser. Processing stays local, with no server upload
required.

<div class="d-flex flex-wrap gap-2 mt-3">
  <a class="btn btn-primary" href="https://mgf.earthmetabolome.org/">Open service</a>
  <a class="btn btn-outline-primary" href="https://github.com/earth-metabolome-initiative/mascot-rs"><i class="fab fa-github me-1"></i> GitHub</a>
</div>
{{< /card >}}

{{< card title="SMARTS Evolution" icon="fas dna" >}}
Interactive browser workbench for evolving SMARTS patterns against positive
and negative SMILES sets, supporting iterative structure-pattern discovery.

<div class="d-flex flex-wrap gap-2 mt-3">
  <a class="btn btn-primary" href="https://smartsevo.earthmetabolome.org/">Open service</a>
  <a class="btn btn-outline-primary" href="https://github.com/earth-metabolome-initiative/smarts-evolution"><i class="fab fa-github me-1"></i> GitHub</a>
</div>
{{< /card >}}
{{< /card-group >}}
