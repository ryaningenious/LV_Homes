# **📖 Docker Volume Backup & Restore Guide (Windows + Linux Docker)**

## **🛠 Prerequisites**

- Both **Windows machines** have **Docker Desktop** installed and running **Linux-based containers**.
- The **remote Windows machine** has the **OpenSSH Server** enabled.
- You have **SSH access** between machines.

---

## **🔹 Step 1: Enable SSH on the Remote Windows Machine**

https://www.hanselman.com/blog/how-to-ssh-into-a-windows-10-machine-from-linux-or-windows-or-anywhere

## **🔹 Step 2: Backup the Docker Volume on the Remote Machine**

### **1️⃣ Find the Volume Name**

On the **remote machine**, list all Docker volumes:

```sh
docker volume ls
```

Example output:

```
DRIVER    VOLUME NAME
local     raytha_raytha_pg_data
local     raytha_raytha_user_uploads
```

Let’s assume the volume name is `my_app_data`.

### **2️⃣ Create a Backup of the Volume**

Run the following command to create a backup file:

#### User Uploads

```sh
docker run --rm -v raytha_raytha_user_uploads:/data -v C:\Users\ryan\Documents:/backup ubuntu tar cvzf /backup/raytha_raytha_user_uploads_backup.tar.gz -C /data .
```

#### PG Data

```sh
docker run --rm -v raytha_raytha_pg_data:/data -v C:\Users\ryan\Documents:/backup ubuntu tar cvzf /backup/raytha_raytha_pg_data_backup.tar.gz -C /data .
```

### **3️⃣ Verify the Backup**

Check if the backup file was created:

#### User Uploads

```sh
ls C:\Users\ryan\Documents\raytha_raytha_user_uploads_backup.tar.gz
```

#### PG Data

```sh
ls C:\Users\ryan\Documents\raytha_raytha_pg_data_backup.tar.gz
```

---

## **🔹 Step 3: Transfer the Backup to Your Local Machine**

### **1️⃣ Copy the Backup File Using SCP**

On your **local Windows machine**, open **Command Prompt (cmd)** or **PowerShell** and run:

Exit first in your ssh connection by running

```sh
exit
```

#### User Uploads

```sh
scp user@DESKTOP-4AEAPEN.local:C:\Users\ryan\Documents\raytha_raytha_user_uploads_backup.tar.gz C:\Users\ryan\Documents\
```

#### PG Data

```sh
scp user@DESKTOP-4AEAPEN.local:C:\Users\ryan\Documents\raytha_raytha_pg_data_backup.tar.gz C:\Users\ryan\Documents\
```

---

## **🔹 Step 4: Restore the Backup on Your Local Windows Machine**

### **1️⃣ Create a New Docker Volume**

```sh
docker volume create raytha_raytha_user_uploads
docker volume create raytha_raytha_pg_data
```

### **2️⃣ Restore the Backup into the New Volume**

#### User Uploads

```sh
docker run --rm -v raytha_raytha_user_uploads:/data -v C:\Users\ryan\Documents:/backup ubuntu tar xvzf /backup/raytha_raytha_user_uploads_backup.tar.gz -C /data
```

sudo docker run --rm -v raytha_raytha_user_uploads:/data -v ~:/backup ubuntu tar xvzf /backup/raytha_raytha_user_uploads_backup.tar.gz -C /data

#### PG Data

```sh
docker run --rm -v raytha_raytha_pg_data:/data -v C:\Users\ryan\Documents:/backup ubuntu tar xvzf /backup/raytha_raytha_pg_data_backup.tar.gz -C /data
```

sudo docker run --rm -v raytha_raytha_pg_data:/data -v ~:/backup ubuntu tar xvzf /backup/raytha_raytha_pg_data_backup.tar.gz -C /data

### **3️⃣ Verify the Restoration**

```sh
docker run --rm -v raytha_raytha_pg_data:/data ubuntu ls -l /data
```

If you see your files, **the restoration was successful**! ✅

---

## **🔹 Step 5: Use the Restored Volume in Docker Compose**

### **1️⃣ Create a `docker-compose.yml` File**

Create a `docker-compose.yml` file in your project directory:

```yaml
version: "3.8"

services:
  my_app:
    image: ubuntu
    container_name: my_app
    volumes:
      - my_app_data:/data
    command: tail -f /dev/null # Keeps the container running for testing

volumes:
  my_app_data:
    external: true # Use the existing volume restored earlier
```

### **2️⃣ Run Docker Compose**

```sh
docker-compose up -d
```

### **3️⃣ Verify That the Restored Data is Accessible**

```sh
docker exec -it my_app ls -l /data
```

If you see your files, **your restored volume is working correctly**! 🎉

---

## **🔹 Step 6: Use the Volume in a Real Application**

### **Example: Using the Restored Volume with PostgreSQL**

```yaml
version: "3.8"

services:
  db:
    image: postgres:latest
    container_name: postgres_db
    environment:
      POSTGRES_USER: myuser
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: mydatabase
    volumes:
      - my_app_data:/var/lib/postgresql/data

volumes:
  my_app_data:
    external: true
```

### **4️⃣ Run Docker Compose for PostgreSQL**

```sh
docker-compose up -d
```

---

## **🎯 Summary**

✅ **Enabled SSH on the remote Windows machine**  
✅ **Created a backup of the Docker volume on the remote machine**  
✅ **Transferred the backup file using SCP**  
✅ **Restored the backup to a new volume on the local machine**  
✅ **Used the restored volume in Docker Compose**  
✅ **Verified data persistence with real applications**

Now your **Docker environment** is fully set up with a persistent volume! 🚀

Let me know if you have any questions! 😊
