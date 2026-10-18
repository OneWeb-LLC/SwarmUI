# SwarmUI as an OWeb satellite

Status: Beta runtime validated; production product integration staged
Date: 2026-10-18

SwarmUI is the whole image/video generation application layer—UI, workflow orchestration, and backend integrations—over ComfyUI and model runtimes. It is not the GPU itself and it is not the agency operating system.

## Deployment decision

- Vercel: OWeb-branded control plane and satellite UI.
- Runpod: persistent GPU runtime for interactive generation.
- ComfyUI: generation engine/backend used by SwarmUI.
- Serverless: not required for the current persistent pod deployment.
- Customer access: through OWeb Studio; the raw SwarmUI interface remains private/internal behind server-to-server authentication.

## Current progress

The OWeb SwarmUI beta is deployed at the Vercel satellite surface and connected to a persistent Runpod pod. The runtime has been opened successfully, local ComfyUI-backed models were selected, and the initial image-generation surface is available. The current setup is a beta smoke-test environment, not yet a production multi-tenant service.

## Product boundary

OWeb owns OneID, workspace activation, entitlements, customer-facing branding, job authorization, audit, and shared asset/provenance records. SwarmUI owns generation workflows and backend orchestration. Model and backend licenses remain separately reviewable; SwarmUI's MIT license does not automatically grant rights to every connected model or backend.

## Next gates

1. Authenticate the OWeb-to-SwarmUI server-to-server call.
2. Enforce workspace-scoped jobs, storage, and quotas.
3. Keep backend URLs and provider credentials out of the browser.
4. Add queueing, cancellation, timeout, retry, and failure evidence.
5. Run image/video smoke tests under a synthetic tenant before enabling customer access.
