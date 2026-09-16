import cv2
import os
import sys

video_path = "public/assets/video/video hero.mp4"
output_dir = "public/assets/hero-frames"

if not os.path.exists(video_path):
    print(f"Error: {video_path} not found")
    sys.exit(1)

os.makedirs(output_dir, exist_ok=True)

cap = cv2.VideoCapture(video_path)
if not cap.isOpened():
    print("Error opening video")
    sys.exit(1)

frame_count = 0
print("Starting extraction...")
while True:
    ret, frame = cap.read()
    if not ret: break
    
    # Alta qualità e risoluzione per i frame
    h, w = frame.shape[:2]
    target_w = 1920
    if w > target_w:
        ratio = target_w / float(w)
        target_h = int(h * ratio)
        frame = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_AREA)
    
    out_path = os.path.join(output_dir, f'frame_{frame_count:04d}.webp')
    cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 85])
    frame_count += 1
    
    if frame_count % 50 == 0:
        print(f"Extracted {frame_count} frames...")
        
cap.release()
print(f"Finished. Total frames: {frame_count}")
