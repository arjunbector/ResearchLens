from flask import Flask, request
from flask_restful import Resource, Api
from pdf_to_docx import *
from get_vector_store import *
from gemini_request import *


app = Flask(__name__)
api = Api(app)

class MyAPI(Resource):
    def post(self):
        data = request.get_json()
        # Process the data here
        response = {}
        if data['key']==100:
            pdf_to_docx()
            change_to_one_column(file_path)
            convert("research.docx")
            dell()
            getVector()
            response['val'] = "lol"
        else:
            response['val'] = image_text()

        return {'message': 'Data received', 'data': response['val']}, 200

api.add_resource(MyAPI, '/api')

if __name__ == '__main__':
    app.run(debug=True)