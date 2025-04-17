import re
from pathlib import Path

FUNCTIONS_DIR = Path("amplify/backend/function")
REQUIREMENTS_PATH = Path("requirements.txt")

STANDARD_LIBS = set([
    'os', 'sys', 're', 'math', 'json', 'datetime', 'time', 'subprocess',
    'random', 'pathlib', 'itertools', 'collections', 'functools', 'typing'
])

def extract_imports_from_index(index_path):
    imports = set()
    with open(index_path, "r", encoding="utf-8") as f:
        for line in f:
            line = line.strip()
            match = re.match(r'(?:from|import) (\w+)', line)
            if match:
                module = match.group(1)
                if module not in STANDARD_LIBS:
                    imports.add(module)
    return imports

def generate_combined_requirements():
    all_imports = set()

    for func_dir in FUNCTIONS_DIR.iterdir():
        index_path = func_dir / "src" / "index.py"
        if index_path.exists():
            print(f"🔍 Scanning: {index_path}")
            imports = extract_imports_from_index(index_path)
            all_imports.update(imports)
        else:
            print(f"⛔ No index.py in {func_dir.name}")

    if all_imports:
        with open(REQUIREMENTS_PATH, "w", encoding="utf-8") as f:
            for module in sorted(all_imports):
                f.write(f"{module}\n")
        print(f"\n✅ Root requirements.txt generated with {len(all_imports)} packages.")
    else:
        print("\n📭 No external packages found.")

if __name__ == "__main__":
    generate_combined_requirements()
