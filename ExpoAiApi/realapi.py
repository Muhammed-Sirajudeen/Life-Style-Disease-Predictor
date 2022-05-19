# using flask_restful
from flask import Flask, jsonify, request
from flask_restful import Resource, Api
import pymongo
# creating the flask app
app = Flask(__name__)
# creating an API object
api = Api(app)

# making a class for a particular resource
# the get, post methods correspond to get and post requests
# they are automatically mapped by flask_restful.
# other methods include put, delete, etc.
class Hello(Resource):

	# corresponds to the GET request.
	# this function is called whenever there
	# is a GET request for this resource
	def get(self):

		return jsonify({'message': 'hello world'})

	# Corresponds to POST request
	def post(self):
		
		data = request.get_json()	 # status code
		name=data.get('name')
		
		myclient=pymongo.MongoClient("mongodb://127.0.0.1:27017")
		mydb=myclient['machinelearningdata']
		mycol=mydb['diabeticdata']
		
		print(data)
		x=mycol.insert_one(data)


class Heart(Resource):

	# corresponds to the GET request.
	# this function is called whenever there
	# is a GET request for this resource
	def get(self):

		return jsonify({'message': 'hello world'})

	# Corresponds to POST request
	def post(self):
		
		data = request.get_json()	 # status code
		name=data.get('name')
		
		myclient=pymongo.MongoClient("mongodb://127.0.0.1:27017")
		mydb=myclient['machinelearningdata']
		mycol=mydb['heartdata']
		
		print(data)
		x=mycol.insert_one(data)
# another resource to calculate the square of a number

class Stroke(Resource):

	# corresponds to the GET request.
	# this function is called whenever there
	# is a GET request for this resource
	def get(self):

		return jsonify({'message': 'hello world'})

	# Corresponds to POST request
	def post(self):
		
		data = request.get_json()	 # status code
		name=data.get('name')
		
		myclient=pymongo.MongoClient("mongodb://127.0.0.1:27017")
		mydb=myclient['machinelearningdata']
		mycol=mydb['strokedata']
		
		print(data)
		x=mycol.insert_one(data)

# adding the defined resources along with their corresponding urls
api.add_resource(Hello, '/diabetes')
api.add_resource(Heart, '/heart')
api.add_resource(Stroke,'/stroke')
# driver function
if __name__ == '__main__':

	app.run(debug = True)
