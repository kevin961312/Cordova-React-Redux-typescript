import os 
import shutil
import subprocess

def run_commands(command_folder_list):
    for command, folder_path in command_folder_list:
        print(f"Running: '{command}' in '{folder_path}'")
        try:
            result = subprocess.run(
                command,
                shell=True,
                check=True,
                text=True,
                stdout=subprocess.PIPE,
                stderr=subprocess.PIPE,
                cwd=folder_path
            )
            print("Output:\n", result.stdout)
            if result.stderr:
                print("Errors:\n", result.stderr)
        except subprocess.CalledProcessError as e:
            print(f"Command failed with exit code {e.returncode}")
            print("Error output:\n", e.stderr)
            break  

if __name__ == "__main__":
    # Ejemplo de uso:
    commands = [
        ("npm install", "./web"),
        ("npm run build", "./web"),
        ("cp -R ../web/build/* ../mobile/android/www", "./web"),
        ("cp -R ../web/build/* ../mobile/ios/www", "./web")
    ]
    run_commands(commands)

