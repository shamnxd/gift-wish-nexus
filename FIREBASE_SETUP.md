# Firebase Storage Setup Guide

## Common Issues with Firebase Storage

### Issue: Request URL Error
If you're seeing errors like:
```
Request URL: https://firebasestorage.googleapis.com/v0/b/your-bucket/o?name=...
```

This is usually caused by:
1. **Firebase Storage Security Rules** - Not allowing read/write access
2. **Storage Bucket Not Enabled** - Storage needs to be enabled in Firebase Console
3. **CORS Configuration** - Missing CORS settings for your domain

## Step-by-Step Fix

### 1. Enable Firebase Storage

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Select your project: `secret-santa-cdee3`
3. Click on **Storage** in the left sidebar
4. Click **Get started**
5. Choose **Start in test mode** (for development) or **Production mode**
6. Select the same location as your Firestore database

### 2. Set Up Security Rules

Go to **Storage > Rules** and use one of these configurations:

#### For Development (Test Mode):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    match /{allPaths=**} {
      allow read, write: if true;
    }
  }
}
```

#### For Production (Recommended):
```javascript
rules_version = '2';
service firebase.storage {
  match /b/{bucket}/o {
    // Allow read access to all files
    match /{allPaths=**} {
      allow read: if true;
    }
    
    // Allow write access to letters folder
    match /letters/{fileName} {
      allow write: if request.resource.size < 5 * 1024 * 1024 // 5MB limit
                   && request.resource.contentType.matches('image/.*');
    }
    
    // Allow write access to sponsors folder
    match /sponsors/{fileName} {
      allow write: if request.resource.size < 5 * 1024 * 1024 // 5MB limit
                   && request.resource.contentType.matches('image/.*');
    }
  }
}
```

### 3. Configure CORS (if needed)

If you're still having issues, you may need to configure CORS for your storage bucket:

1. Install Google Cloud SDK (if not already installed)
2. Create a `cors.json` file:
```json
[
  {
    "origin": ["*"],
    "method": ["GET", "POST", "PUT", "DELETE", "HEAD"],
    "maxAgeSeconds": 3600
  }
]
```

3. Run this command (replace `your-bucket` with your actual bucket name):
```bash
gsutil cors set cors.json gs://your-bucket
```

### 4. Verify Environment Variables

Make sure your `.env` file has the correct storage bucket:
```env
VITE_FIREBASE_STORAGE_BUCKET=secret-santa-cdee3.firebasestorage.app
```

Note: The storage bucket format is usually `your-project-id.firebasestorage.app` or `your-project-id.appspot.com`

### 5. Check Browser Console

Open your browser's Developer Tools (F12) and check:
- **Console tab** for error messages
- **Network tab** for failed requests (look for 403, 404, or CORS errors)

## Common Error Codes

- **403 Forbidden**: Security rules are blocking access
- **404 Not Found**: File doesn't exist or path is wrong
- **CORS Error**: Missing CORS configuration
- **401 Unauthorized**: Authentication required but not provided

## Testing

After setting up, test by:
1. Uploading a letter with a drawing
2. Check Firebase Console > Storage to see if the file appears
3. Check the browser console for any errors

## Need Help?

If issues persist:
1. Check Firebase Console > Storage > Files to see if uploads are working
2. Check Firebase Console > Storage > Rules to verify rules are saved
3. Check browser console for specific error messages
4. Verify your `.env` file has correct Firebase configuration

