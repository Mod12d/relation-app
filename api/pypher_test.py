from pypher import Pypher, __
from pypher.builder import Param
from import_data import session

p = Pypher()

name = Param('my_name', 'しまぶー')
test_code = p.CREATE.node(name=name)

print(test_code)
# session.run("CREATE (user:User { Id: 456, Name: 'Jim' })")
session.run(str(test_code))