from flask import Flask, request, session
from flask_restful import Resource, Api
from google.generativeai import GenerativeModel
import google.generativeai as genai

app = Flask(__name__)
api = Api(app)
app.secret_key = 'harshisgreat'  # Replace with your secret key

genai.configure(api_key="AIzaSyCE_8JSFhrMc8e4kQE0rXo4HIpjXQ-EI0c")

class MyAPI(Resource):
    def post(self):
        data = request.get_json()
        if data['key'] == 143:
            query = data['query']

            model = GenerativeModel('gemini-pro')

            # Get the chat history from the session
            history_dicts = session.get('history', [])

            # Recreate the chat instance from the history
            chat = model.start_chat(history=history_dicts)

            # Send the new message
            response = chat.send_message(query)

            # Convert each message in the chat history into a dictionary
            history = [{'parts':{'text': part.text}, 'role': message.role} for message in chat.history for part in message.parts]

            # Update the chat history in the session
            session['history'] = history

            return {'message': 'Data received', 'response': response.text}, 200

api.add_resource(MyAPI, '/api_test')

if __name__ == '__main__':
    app.run(debug=True)