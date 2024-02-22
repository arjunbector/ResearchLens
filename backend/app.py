from flask import Flask, request
from flask_restful import Resource, Api


app = Flask(__name__)
api = Api(app)

class MyAPI(Resource):
    def post(self):
        data = request.get_json()
        # Process the data here
        response = {}
        if data['key']==100:
            lang = data["lang"]
            dta_str = data["data_str"]
            response['val'] = "lol"
            
        else:
            response['val'] = "Not Great"

        return {'message': 'Data received', 'data': response['val']}, 200

api.add_resource(MyAPI, '/api')

if __name__ == '__main__':
    app.run(debug=True)