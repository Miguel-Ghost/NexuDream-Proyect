# Qhanawi
## 1. Descripción
Qhanawi es una aplicación móvil que permite a agricultores diagnosticar enfermedades en hojas de cultivos (tomate, uva, papa, fresa) mediante fotos tomadas con su celular. El sistema utiliza una red neuronal ResNet personalizada entrenada con 18 clases de enfermedades.

## 2. Inicio Rapido

### Backend 
```
cd backend

```

Crear entorno virtual

```
python -m venv venv
source venv/bin/activate  # Linux/Mac | venv\Scripts\activate Windows
```

Instalar dependencias
```
pip install -r requirements.txt
```
Ejecutar servidor
```
uvicorn main:app --host 0.0.0.0 --port 8000 --reload
```

### Frontend
```
cd fronten 
```
Instalar dependencias

```
npm install
```

Iniciar app (conectar celular o emulador)

```
npm expo web
npm expo android
```