# QuietLedger Vercel Deployment Guide

## Quick Deploy (Recommended)

### Option 1: GitHub + Vercel Web Interface (Fastest)

1. **Push your repo to GitHub**
   ```bash
   git push origin main
   ```

2. **Go to Vercel.com**
   - Sign in with GitHub
   - Click "Add New..." → "Project"
   - Select your QuietLedger repository
   - Vercel will auto-detect Next.js settings

3. **Configure Environment**
   - Project settings → Environment Variables
   - Add these (if needed):
     - `NEXT_PUBLIC_APP_NAME=quietledger`
     - `NEXT_PUBLIC_CONTRACT_ID=<your-contract-id>`

4. **Deploy**
   - Click "Deploy"
   - Wait 2-3 minutes
   - Your URL will appear: `https://quietledger-xxx.vercel.app`

### Option 2: Vercel CLI (Manual)

1. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

2. **Authenticate**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel --prod
   ```

   At prompts:
   - Confirm project name: `quietledger`
   - Confirm build command: (use default)
   - Confirm output directory: `.next`

4. **Get your URL**
   Vercel will display your live URL after deployment

## Environment Variables

For production Vercel deployment, add these in Vercel Project Settings → Environment Variables:

```
NEXT_PUBLIC_APP_NAME=quietledger
NEXT_PUBLIC_CONTRACT_ID=<your-contract-id>
PROOF_SERVER_URL=https://proof-server.midnight.network
PROOF_SERVER_API_KEY=<your-api-key>
```

⚠️ **IMPORTANT:** Never use `NEXT_PUBLIC_` prefix for `PROOF_SERVER_API_KEY`

## After Deployment

1. **Test your live URL**
   - Open the Vercel URL in browser
   - Test Holder page: Issue a passport
   - Test Verifier page: Register a policy and verify
   - Confirm everything works (not just localhost)

2. **Update your README**
   - Add live URL to Wave 1 Deliverables Checklist
   - Example: `https://quietledger-xyz123.vercel.app`

3. **For AKINDO Submission**
   - Copy your live Vercel URL
   - Add to submission form as "Live Demo URL"

## Troubleshooting

| Issue | Solution |
|-------|----------|
| Deployment fails | Check build logs in Vercel dashboard, ensure Node 18+ |
| API routes 404 | Verify `/api` folder exists, restart deployment |
| Styles not loading | Clear browser cache, hard refresh (Ctrl+Shift+R) |
| Environment vars not working | Redeploy after setting vars (changes don't auto-reload) |
| Proof server unreachable | Check API key and URL are correct (private vars only) |

## Monitoring

After deployment, monitor at:
- **Vercel Dashboard:** vercel.com/dashboard
- **Analytics:** Project → Analytics (view traffic)
- **Logs:** Project → Deployments → Select deployment → Logs

## Next Steps

Once deployed to Vercel:
1. ✓ Live URL ready for submission
2. ✓ Create slide deck (5-8 slides)
3. ✓ Record demo video
4. ✓ Submit to AKINDO with:
   - GitHub repo URL
   - Live Vercel URL
   - Slide deck link
   - Demo video link
