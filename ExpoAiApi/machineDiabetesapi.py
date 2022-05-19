from pymongo import MongoClient
import pickle  
import time
import pandas as pd
from matplotlib import pyplot as plt
from sklearn.linear_model import LogisticRegression
from sklearn.preprocessing import LabelEncoder
from sklearn import tree
Client = MongoClient()
myclient = MongoClient('localhost', 27017)
  

countlist=[1]

my_database = myclient["machinelearningdata"]  
my_collection = my_database["diabeticdata"] 
end=1 
# number of documents in the collection
while True:
    my_database = myclient["machinelearningdata"]  
    my_collection = my_database["diabeticdata"] 
    
    total_count = my_collection.count_documents({})
    
    
    
    #print(countlist)
    countlist.append(total_count)
  
    while True:
        
        if countlist[-1]>countlist[-2]:
            print("data has been added")
            for x in my_collection.find():
                pass
            
            with open('diabetic_model','rb') as f:
                
                mp=pickle.load(f)
            c=mp.predict([[x['Age'],x['FamilyHis'],x['Ethnicity'],
                           x['Symptoms'],x['Excercise']]])
            print("The model predicted",c,"for secret id",x['secretid'])



            datadiabetic={'type':'testresult','secretid':str(x['secretid']),'result':int(c[0]),'name':str(x['name'])}
            print(datadiabetic)
            my_database1 = myclient["machinelearningdata"]  
            my_collection1 = my_database1["diabeticresults"] 
            z=my_collection1.insert_one(datadiabetic)
            countlist.clear()
            countlist.append(total_count)
            countlist.append(total_count)
            #print(countlist)
            
            break
            
            print("machine learning executed")
        else:
            break
