# Cloudflare Worker Short Link Redirects
> Built of this [TS template](https://github.com/EverlastingBugstopper/worker-typescript-template)

Use Cloudflare Workers and KV to provide a urlshortener redirect service for my [personal site](https://calebukle.com)

## Demo

Clicking [https://link.calebukle.com/ng-601e9](https://link.calebukle.com/ng-601e9) will redirect to [https://calebukle.com/blog/angular-code-coverage-badge-with-gitlab-ci](https://calebukle.com/blog/angular-code-coverage-badge-with-gitlab-ci)

See how much shorter that link is! Amazing! Wow! Pure Magic!

> Note: Currently adding some query parameters for debugging/future client analytics if I want to go that route.

## Manage KV Store
Cloudflare has a simple interface for adding keys, so for now I'm just manually adding the keys for each item I wish to link. I'll look at updating this to be automating this down the road, we'll see.

![KV Store](https://media.calebukle.com/uploads/2020/04/wk-JrppDaq71G.gif)

### Deciding the Key
Right now I'm just taking the first 5 characters of the SHA1 hash of the file contents and adding a small word at the beginning to signify what the source subject might be i.e. `ssg` is `static site generator`

This isn't an enforced standard. Just something short and somewhat easy to copy down. Gotta keep keys short.

```powershell
Get-FileHash SomeFile.md | select { $_.Hash.SubString(0,5).ToLower() } # i.e. 9791a
``` 
> You can [install Powershell](https://github.com/PowerShell/PowerShell#get-powershell) on MacOS and Linux ;) 

## Testing

- [ ] TODO rewrite test from template

## Next Steps

1. [ ] Add short links as the shareable links in blog [share sheet](https://gitlab.com/caleb-ukle/portfolio/-/tree/master/src/app/share-sheet)  
1. [ ] Add Cloudflare worker deployment to prod CI process
1. [ ] Try to see if I can capture this info and make analytics from it. 
    - Analytics for the https://media.calebukle.com S3 bucket would be 👌
1. [ ] Automate link shortening for [ShareX](https://getsharex.com/)
    - And maybe [Kap](https://getkap.co/)

## ⚠️ Caveats
> From TS Template README

The `service-worker-mock` used by the tests is not a perfect representation of the Cloudflare Workers runtime. It is a general approximation. We recommend that you test end to end with `wrangler dev` in addition to a [staging environment](https://developers.cloudflare.com/workers/tooling/wrangler/configuration/environments/) to test things before deploying.
