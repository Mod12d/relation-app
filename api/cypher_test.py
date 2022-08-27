from import_data import session

# 名前を入れてテスト


session.run("CREATE (person:Person {name: $name, description: $description, profile_image_url: $profile_image_url}) RETURN person", name="しまぶー", description="test", profile_image_url="http://pbs.twimg.com/profile_images/1560211976802172928/Kzs8aUqr_normal.jpg")



# profile_image_url