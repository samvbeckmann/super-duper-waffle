"Just for modifying the json file :)"
import re

def append_data(json_file, new_data):
    "Given this project's json file, appends to each line the relevant info."
    json = []
    for line in open(json_file):
        json.append(line)
    appendages = []
    for line in open(new_data):
        appendages.append(line.rstrip('\n'))

    new_lines = [re.sub(r'\}', appendages[i] + '}', json[i + 2]) for i in range(len(appendages))]
    target = open('out.txt', 'w')
    target.write('{\n    "states": [\n')
    for line in new_lines:
        target.write(line)
    target.write('    ]\n}')

append_data('data/states.json', 'data/census_data/Data.txt')
