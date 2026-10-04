OUTFITTERS LOCAL IMAGE DOWNLOADER

1. Put download_unsplash_products.py in the React project root:
   F:\Outfitters_Professional\outfitters\

2. Make sure this exists:
   src\data\products.js

3. Open PowerShell in the project root.

4. Run:
   python download_unsplash_products.py

The script:
- reads products.js
- finds all images.unsplash.com/photo-... URLs
- removes duplicate URLs
- downloads each image
- saves them to public/images/products/
- creates src/data/imageMap.js
- creates outfitters_product_images.zip

The previous downloader returned 0 because its URL matching was too strict.
This version handles single quotes, double quotes, template strings and
existing URL parameters.
