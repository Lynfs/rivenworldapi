import xlrd 
import requests
from time import sleep

wb = xlrd.open_workbook('rivenguide.xlsx') 
sheet = wb.sheet_by_index(0) 

data = dict()
for i in range(38):  
    datalist = list()
    for j in range(4):
        texto = sheet.cell_value(i, j).replace('\n',',').strip().split(',')
        datalist.append(texto)
    name = datalist[0][0]
    del datalist[0]
    data[name] = datalist

for i in data.keys():
    heroname = i
    todo, nottodo, note = '','',''
    for alltodo in data[i][0]:
        todo+= alltodo+', '
    for allnottodo in data[i][1]:
        nottodo+= allnottodo+', '
    for allnotes in data[i][2]:
        note+= allnotes+', '
    body = {
	"name": heroname,
	"todo": todo,
	"nottodo": nottodo,
	"note": note}
    r = requests.post('http://localhost:3000/hero', json=body)
    print(r.text)
    sleep(6)
