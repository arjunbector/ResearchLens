from flask import Flask, request
from flask_cors import CORS
from flask_restful import Resource, Api
from pdf_to_docx import *
from get_vector_store import *
from gemini_request import *
from win32com import client as win_client
from werkzeug.utils import secure_filename
import os

app = Flask(__name__)
CORS(app)
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


class PDFUploadAPI(Resource):
    def post(self):
        if 'file' not in request.files:
            return {'message': 'No file part in the request'}, 400
        file = request.files['file']
        if file.filename == '':
            return {'message': 'No selected file'}, 400
        if file and file.filename.endswith('.pdf'):
            filename = secure_filename(file.filename)
            file.save(os.path.join('backend/RPaper2.pdf'))
            return {'message': 'PDF file received and saved'}, 200
        else:
            return {'message': 'Unsupported file type'}, 400

api.add_resource(PDFUploadAPI, '/uploadpdf')

if __name__ == '__main__':
    app.run(debug=True)
