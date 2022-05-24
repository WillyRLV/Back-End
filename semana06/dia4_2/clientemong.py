from pymongo import MongoClient

client = MongoClient('mongodb://127.0.0.1:27017')
db = client['cursos']
colAlumnos= db['alumnos']
colAlumnos = db['alumnos']

print(colAlumnos.find())

for alumnos in colAlumnos.find():
    print(alumnos['nombre']+"-"+ alumnos['email'] +"-"+ str(alumnos['nota']))
    