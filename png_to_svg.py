import cv2
import numpy as np

def create_svg():
    # Read the image, preserving alpha if present
    img = cv2.imread('public/assets/images/logo-new-rev2.png', cv2.IMREAD_UNCHANGED)
    
    if img.shape[2] == 4:
        # Use alpha channel as mask
        gray = 255 - img[:, :, 3]
    else:
        gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
        
    # Threshold to get text (assuming dark text on light bg or transparent)
    # If transparent, alpha channel 255 -> black text, 0 -> white bg
    ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)

    # Find contours
    contours, hierarchy = cv2.findContours(thresh, cv2.RETR_EXTERNAL, cv2.CHAIN_APPROX_SIMPLE)

    height, width = img.shape[:2]

    svg_content = f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {width} {height}" width="100%" height="100%">\n'
    svg_content += '  <g fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n'

    for cnt in contours:
        if len(cnt) < 3:
            continue
        
        path = "M "
        for i, point in enumerate(cnt):
            x, y = point[0]
            path += f"{x},{y} "
            if i == 0:
                pass
            else:
                path = path.replace("M ", "M ") # Just formatting
                if i == 1:
                    path = path.replace(f"{x},{y} ", f"L {x},{y} ")
                else:
                    path = path.replace(f" {x},{y} ", f" L {x},{y} ")
        path += "Z"
        # Optimize simple L paths slightly
        
        svg_content += f'    <path d="{path}" />\n'

    svg_content += '  </g>\n</svg>'

    with open('public/assets/images/logo-animated.svg', 'w') as f:
        f.write(svg_content)
    print("SVG created successfully with", len(contours), "paths.")

if __name__ == "__main__":
    create_svg()
