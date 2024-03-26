import psycopg2
from flask import Flask, request, jsonify, render_template

app = Flask('api-bd')

# Conectar com psycopg2
def connect(host_name, user_name, user_password, db_name):
    connection = None
    try:
        connection = psycopg2.connect(
            host=host_name,
            user=user_name,
            password=user_password
        )
        print("PostgreSQL Database connection successful")
    except psycopg2.Error as e:
        print(f"Error: '{e}'")
    return connection

# Consulta SQL para Modificar dados
def execute_query(connection, query, data=None):
    cursor = connection.cursor()
    try:
        cursor.execute(query, data)
        connection.commit() #commita/aplica os dados no bd
        print("Query successful")
    except psycopg2.Error as e:
        print(f"Error: '{e}'")

# Consulta SQL para Leitura de Dados
def read_query(connection, query, data=None):
    cursor = connection.cursor()
    result = None
    try:
        cursor.execute(query, data)
        result = cursor.fetchall() #retorna resultados
        return result
    except psycopg2.Error as e:
        print(f"Error: '{e}'")

# Conexão com o PostgreSQL
host = "bd.c90644aq4xwd.us-east-1.rds.amazonaws.com"
user = "postgres"
password = "bancodedados"
db = "mydb"

connection = connect(host, user, password, db)
#################

#### FUNCOES WEB-API - INICIO ####

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/consulta')
def consulta():
    return render_template('consulta.html')

# Métodos CRUD para a tabela BENEFICIO
@app.route("/beneficios", methods=["GET"])
def listar_beneficios():
    query = "SELECT * FROM BENEFICIO"
    try: 
        result = read_query(connection, query)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
    
@app.route("/beneficios/consultar", methods=["GET"])
def consultar_beneficio():
    beneficio_id = request.args.get('id')
    query = "SELECT * FROM BENEFICIO WHERE id_beneficio = %s"  
    data = (beneficio_id,)  
    try:
        result = read_query(connection, query, data)
        return jsonify(result), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/beneficios/adicionar", methods=["POST"])
def adicionar_beneficio():
    req = request.get_json()
    id_beneficio = req.get("id_beneficio")
    ano = req.get("Ano")
    data_nascimento = req.get("Data_nascimento")
    sexo = req.get("Sexo")
    municipio = req.get("Municipio")
    estado = req.get("Estado")

    query = "INSERT INTO BENEFICIO (id_beneficio, Ano, Data_nascimento, Sexo, Municipio, Estado) VALUES (%s, %s, %s, %s, %s, %s)"
    data = (id_beneficio, ano, data_nascimento, sexo, municipio, estado)
    try:
        execute_query(connection, query, data)  
        return jsonify({"message": "Benefício adicionado com sucesso"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/beneficios/atualizar", methods=["PUT"])
def atualizar_beneficio():
    req = request.get_json()
    id_beneficio = req.get("id_beneficio")
    novo_ano = req.get("Ano")
    novo_data_nascimento = req.get("Data_nascimento")
    novo_sexo = req.get("Sexo")
    novo_municipio = req.get("Municipio")
    novo_estado = req.get("Estado")

    query = "UPDATE BENEFICIO SET Ano = %s, Data_nascimento = %s, Sexo = %s, Municipio = %s, Estado = %s WHERE id_beneficio = %s"
    data = (novo_ano, novo_data_nascimento, novo_sexo, novo_municipio, novo_estado, id_beneficio)
    try:
        execute_query(connection, query, data)  
        return jsonify({"message": "Benefício atualizado com sucesso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route("/beneficios/excluir", methods=["DELETE"])
def excluir_beneficio():
    id_beneficio = request.args.get('id')
    query = "DELETE FROM BENEFICIO WHERE id_beneficio = %s"
    data = (id_beneficio,)
    try:
        execute_query(connection, query, data)  
        return jsonify({"message": "Benefício excluído com sucesso"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

app.run()

#### FUNCOES WEB-API - FIM ####