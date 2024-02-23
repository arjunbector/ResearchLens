from flask import Flask, request
from flask_restful import Resource, Api
from pdf_to_docx import *
from get_vector_store import *
from gemini_request import *
from win32com import client as win_client

app = Flask(__name__)
api = Api(app)

class MyAPI(Resource):
    def post(self):
        win_client.pythoncom.CoInitialize()  # Add this line

        data = request.get_json()
        # Process the data here
        response = {}
        if data['key']==100:
            pdf_to_docx()
            change_to_one_column(file_path)
            convert("research.docx")
            getVector()
            response['val'] = "lol"
        else:
            query = data['query']
            response['val'] = image_text(query)

        return {'message': 'Data received', 'data': response['val']}, 200

api.add_resource(MyAPI, '/api')

if __name__ == '__main__':
    app.run(debug=True)