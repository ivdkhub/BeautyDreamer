import cv2
import os
import sys

def extract_frames(video_path, output_dir, target_w=1920):
    if not os.path.exists(video_path):
        print(f"Error: {video_path} not found")
        return 0

    os.makedirs(output_dir, exist_ok=True)
    cap = cv2.VideoCapture(video_path)
    frame_count = 0
    print(f"Starting extraction for {video_path}...")
    
    while True:
        ret, frame = cap.read()
        if not ret: break
        
        h, w = frame.shape[:2]
        if w > target_w:
            ratio = target_w / float(w)
            target_h = int(h * ratio)
            frame = cv2.resize(frame, (target_w, target_h), interpolation=cv2.INTER_AREA)
        
        out_path = os.path.join(output_dir, f'frame_{frame_count:04d}.webp')
        cv2.imwrite(out_path, frame, [cv2.IMWRITE_WEBP_QUALITY, 85])
        frame_count += 1
        
        if frame_count % 50 == 0:
            print(f"Extracted {frame_count} frames for {video_path}...")
            
    cap.release()
    print(f"Finished {video_path}. Total frames: {frame_count}")
    return frame_count

# Re-extract hero (restore yellow)
extract_frames("public/assets/video/video hero.mp4", "public/assets/hero-frames", 1920)

# Extract vieni a trovarci
extract_frames("public/assets/video/vieni a trovarci.mp4", "public/assets/vieni-frames", 1920)

print("ALL DONE")
