from threading import Timer
import time

def twoArgs(arg1,arg2):
    print(arg1)
    
    time.sleep(1)
    print(arg2)
    print(" ")

twoArgs("arg1","arg2")
    


