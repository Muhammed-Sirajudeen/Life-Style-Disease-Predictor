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
my_collection = my_database["strokedata"] 
end=1 
# number of documents in the collection
while True:
    my_database = myclient["machinelearningdata"]  
    my_collection = my_database["strokedata"] 
    
    total_count = my_collection.count_documents({})
    
    
    
    #print(countlist)
    countlist.append(total_count)
  
    while True:
        
        if countlist[-1]>countlist[-2]:
            print("data has been added")
            for x in my_collection.find():
                pass
            print(x)
            
            with open('stroke_model','rb') as f:
                
                mp=pickle.load(f)
                
            c=mp.predict(   [   [   int((x['Age'])), x['Smoking'], x['Alcohol'],
                            x['Diabetes'], x['Bloodpressure'], x['Cholestrol']
                           , x['Migraine'] ,x['Drugabuse'] , x['Birthcontrol'] , x['Gender']
                           ,x['Obese'],x['Physicalinactivity']    ]])
            print("The model predicted",c,"for secret id",x['secretid'])


            
            dataheart={'type':'testresult','secretid':str(x['secretid']),'result':int(c[0]),'name':str(x['name'])}
            print(dataheart)
            my_database1 = myclient["machinelearningdata"]  
            my_collection1 = my_database1["strokeresults"] 
            z=my_collection1.insert_one(dataheart)
            countlist.clear()
            countlist.append(total_count)
            countlist.append(total_count)
            #print(countlist)
            
            break
            
            print("machine learning executed")
        else:
            break

