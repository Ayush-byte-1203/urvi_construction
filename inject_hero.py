import os
import re

directory = 'src/pages'
injected_content = """        {pageData?.hero_video && (
          <video autoPlay loop muted playsInline style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0 }}>
            <source src={pageData.hero_video} type="video/mp4" />
          </video>
        )}
        {pageData?.hero_image && !pageData?.hero_video && (
          <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', backgroundImage: `url(${pageData.hero_image})`, backgroundSize: 'cover', backgroundPosition: 'center', zIndex: 0 }} />
        )}
"""

for file in os.listdir(directory):
    if not file.endswith('.jsx'): continue
    filepath = os.path.join(directory, file)
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # If already injected, skip
    if 'pageData?.hero_video &&' in content:
        continue
    
    # Check if file has <HeroOverlay
    if '<HeroOverlay' in content and 'pageData' in content:
        # replace <HeroOverlay ... /> with injected_content + <HeroOverlay ... />
        # we can regex match `<HeroOverlay([^>]*)/>`
        
        # Or simpler, replace <HeroOverlay
        # wait, we need to respect indentation
        new_content = re.sub(r'(\s*)(<HeroOverlay.*?/>)', r'\1' + injected_content.lstrip('\n') + r'\1\2', content)
        
        if new_content != content:
            with open(filepath, 'w', encoding='utf-8') as f:
                f.write(new_content)
            print(f"Updated {filepath}")
