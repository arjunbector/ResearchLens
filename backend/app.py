from flask import Flask, request
from flask_restful import Resource, Api
from pdf_to_docx import *
from get_vector_store import *
from gemini_request import *
from win32com import client as win_client
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
api = Api(app)

class MyAPI(Resource):
    def post(self):
        # Add this line

        data = request.get_json()
        # Process the data here
        response = {}
        if data['key']==100:
            response['val'] = "lol"
        elif data['key']==101:
            query = data['query']
            language = data['language']
            response['val'] = image_text(query, language)

        return {'message': 'Data received', 'data': response['val']}, 200

api.add_resource(MyAPI, '/api')


class PDFUploadAPI(Resource):
    def post(self):
        win_client.pythoncom.CoInitialize()  
        if 'file' not in request.files:
            return {'message': 'No file part in the request'}, 400
        file = request.files['file']
        if file.filename == '':
            return {'message': 'No selected file'}, 400
        if file and file.filename.endswith('.pdf'):
            filename = secure_filename(file.filename)
            file.save(os.path.join('backend/RPaper2.pdf'))
            pdf_to_docx()
            change_to_one_column(file_path)
            convert("research.docx")
            getVector()
            return {'message': 'PDF file received and saved'}, 200
        else:
            return {'message': 'Unsupported file type'}, 400

api.add_resource(PDFUploadAPI, '/uploadpdf')

if __name__ == '__main__':
    app.run(debug=True)
