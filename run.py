import subprocess
import sys
import os
import time

def install_requirements():
    """Install required packages"""
    try:
        subprocess.check_call([sys.executable, "-m", "pip", "install", "-r", "requirements.txt"])
        print("Backend requirements installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"Failed to install backend requirements: {e}")
        return False
    return True

def install_frontend_deps():
    """Install frontend dependencies"""
    try:
        os.chdir("frontend")
        subprocess.check_call(["npm", "install"])
        os.chdir("..")
        print("Frontend dependencies installed successfully")
    except subprocess.CalledProcessError as e:
        print(f"Failed to install frontend dependencies: {e}")
        return False
    except FileNotFoundError:
        print("npm not found. Please install Node.js and npm first.")
        return False
    return True

def run_backend():
    """Run the Flask backend"""
    try:
        print("Starting Flask backend server on http://localhost:5000...")
        return subprocess.Popen([sys.executable, "app.py"])
    except Exception as e:
        print(f"Failed to start backend server: {e}")
        return None

def run_frontend():
    """Run the React frontend"""
    try:
        os.chdir("frontend")
        print("Starting React frontend on http://localhost:3000...")
        return subprocess.Popen(["npm", "start"])
    except Exception as e:
        print(f"Failed to start frontend server: {e}")
        return None

if __name__ == "__main__":
    print("Setting up Road Accident Risk Prediction Application...")

    if not install_requirements():
        sys.exit(1)

    if not install_frontend_deps():
        sys.exit(1)

    # Start backend
    backend_process = run_backend()
    if backend_process is None:
        sys.exit(1)

    # Wait a moment for backend to start
    time.sleep(2)

    # Start frontend
    frontend_process = run_frontend()
    if frontend_process is None:
        backend_process.terminate()
        sys.exit(1)

    print("\n🚀 Application is running!")
    print("📊 Backend API: http://localhost:5000")
    print("🌐 Frontend: http://localhost:3000")
    print("\nPress Ctrl+C to stop both servers...")

    try:
        # Wait for both processes
        backend_process.wait()
        frontend_process.wait()
    except KeyboardInterrupt:
        print("\nStopping servers...")
        backend_process.terminate()
        frontend_process.terminate()
        print("Servers stopped.")