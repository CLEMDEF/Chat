truc = ",.;!?%&*()\n"
with open("file.txt","r") as f:
  liste = f.readlines()
  liste1 = []
  for i in liste :
    for y in i.split(" "):
      y = list(y)
      for x in range(len(y)):
        if y[x] in truc:
          y[x] = ""
      y = "".join(y)
      liste1.append(y)
dico = {}
for i in liste1:
  if i in dico:
    dico[i] += 1
  else :
    dico[i] = 1
print(dico)