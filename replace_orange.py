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
                
                new_content = re.sub(r'#f05a28', '#fb923c', content, flags=re.IGNORECASE)
                new_content = re.sub(r'15,\s*91%', '27, 96%', new_content)
                new_content = re.sub(r'15,91%', '27,96%', new_content)
                new_content = re.sub(r'240,\s*90,\s*40', '251, 146, 60', new_content)
                
                if new_content != content:
                    with open(filepath, 'w', encoding='utf-8') as f:
                        f.write(new_content)
                    print(f"Updated {filepath}")
            except Exception as e:
                print(f"Error on {filepath}: {e}")
