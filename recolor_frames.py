import cv2
import numpy as np
import os
import glob

input_dir = "public/assets/hero-frames"
frames = glob.glob(os.path.join(input_dir, "*.webp"))

print(f"Found {len(frames)} frames to recolor.")

for i, frame_path in enumerate(frames):
    img = cv2.imread(frame_path)
    if img is None: continue
    
    hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)
    
    # Range of yellow color in HSV
    lower_yellow = np.array([15, 40, 40])
    upper_yellow = np.array([45, 255, 255])
    
    # Threshold the HSV image to get only yellow colors
    mask = cv2.inRange(hsv, lower_yellow, upper_yellow)
    
    # Create a copy for the modified HSV
    hsv_modified = hsv.copy()
    
    # Bordeaux HSV: H ~ 170 (or 0-10), S ~ 200, V ~ 100
    # Red is around 0 or 179. We use 175 for a deep red/bordeaux tint.
    hsv_modified[mask > 0, 0] = 175  # Hue to red
    hsv_modified[mask > 0, 1] = np.clip(hsv_modified[mask > 0, 1] * 1.5, 0, 255) # Boost saturation slightly
    hsv_modified[mask > 0, 2] = np.clip(hsv_modified[mask > 0, 2] * 0.5, 0, 255) # Darken it heavily to get bordeaux
    
    # Convert back to BGR
    res = cv2.cvtColor(hsv_modified, cv2.COLOR_HSV2BGR)
    
    # Soften the mask for smooth blending
    mask_blur = cv2.GaussianBlur(mask, (15, 15), 0) / 255.0
    mask_blur = np.expand_dims(mask_blur, axis=2)
    
    # Blend original and modified based on the blurred mask
    final = (res * mask_blur + img * (1 - mask_blur)).astype(np.uint8)
    
    cv2.imwrite(frame_path, final, [cv2.IMWRITE_WEBP_QUALITY, 85])
    
    if (i + 1) % 20 == 0:
        print(f"Processed {i + 1}/{len(frames)} frames...")

print("Recoloring complete!")
