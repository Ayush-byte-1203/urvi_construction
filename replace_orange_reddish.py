import os
import re

directory = 'src'
for root, dirs, files in os.walk(directory):
    for file in files:
        if file.endswith(('.css', '.jsx', '.js')):
            filepath = os.path.join(root, file)
            try:
                with open(filepath, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                new_content = re.sub(r'#fb923c', '#ff6b35', content, flags=re.IGNORECASE)
                new_content = re.sub(r'27,\s*96%', '16, 100%', new_content)
                new_content = re.sub(r'27,96%', '16,100%', new_content)
                new_content = re.sub(r'251,\s*146,\s*60', '255, 107, 53', new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
            except Exception as e:
                print(f"Error on {filepath}: {e}")
