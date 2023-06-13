import googlemaps
from datetime import datetime
from sklearn.neural_network import MLPRegressor
import webbrowser
from IPython.display import HTML
from flask import Flask, request, jsonify
import folium
from geopy.distance import geodesic
import random
from flask import Flask, request, jsonify
import subprocess

app = Flask(__name__)

@app.route('/route', methods=['GET'])
def RouteOptimizer():

    gmaps = googlemaps.Client(key='AIzaSyAv-bbfkhKhpZM3nK7SWqQbgCei3ryZbwE')

    origin = request.args.get('origin')
    destination = request.args.get('destination')

    departure_time = datetime(2023, 5, 1, 9, 0, 0)

    directions = gmaps.directions(origin, destination, mode='driving', departure_time=departure_time, traffic_model='best_guess')

    steps = directions[0]['legs'][0]['steps']

    data = []
    for step in steps:
        start_location = step['start_location']
        end_location = step['end_location']
        distance = step['distance']['value']
        duration = step.get('duration_in_traffic', {}).get('value') or step.get('duration', {}).get('value')
        data.append([start_location['lat'], start_location['lng'], end_location['lat'], end_location['lng'], distance, duration])

    X = [[row[0], row[1], row[2], row[3], row[4]] for row in data]
    y = [row[5] for row in data]
    model = MLPRegressor(hidden_layer_sizes=(100, 50))
    model.fit(X, y)

    for i, row in enumerate(data):
        X_test = [[row[0], row[1], row[2], row[3], row[4]]]
        y_pred = model.predict(X_test)
        data[i].append(y_pred[0])

    # Select best route based on predicted travel times
    best_route = min(data, key=lambda x: x[6])


    # best route on map
    url = f'https://www.google.com/maps/dir/?api=1&origin={origin}&destination={destination}'
    for row in data:
        url += f'&waypoints={row[0]},{row[1]}|{row[2]},{row[3]}'
    webbrowser.open(url)

    print(f'Best route: {best_route[0]}, {best_route[1]} to {best_route[2]}, {best_route[3]}. Predicted travel time: {best_route[6]} seconds.')
    return url

@app.route('/ride', methods=['GET'])
def RideMatcher():
    from geopy.distance import distance
    gmaps = googlemaps.Client(key='AIzaSyAv-bbfkhKhpZM3nK7SWqQbgCei3ryZbwE')
    api_key = 'AIzaSyAv-bbfkhKhpZM3nK7SWqQbgCei3ryZbwE'
    
    origin = request.args.get('origin')
    geocode_result = gmaps.geocode(origin)

    lat = geocode_result[0]['geometry']['location']['lat']
    lng = geocode_result[0]['geometry']['location']['lng']

    origin = (lat, lng)

    radius = 50

    # coordinates = [
    #     (34.056001, -118.237484),
    #     (34.052105, -118.242141),
    #     (34.053563, -119.244696),
    #     (34.055167, -118.240604),
    #     (34.056615, -118.238079)
    # ]

    min_val = 0
    max_val = 1

    # Set the number of pre-decimal places
    pre_decimal_places = 3
    rand_val_str_x=[]
    rand_val_str_y=[]
    # Generate 10 random values
    for i in range(10):
        # Generate a random value with 6 decimal places
        rand_val_x = round(random.uniform(min_val, max_val), 6)+int(origin[0])
        rand_val_y = round(random.uniform(min_val, max_val), 6)+int(origin[1]-1)
        # Convert the random value to a string with 6 decimal places
        rand_val_str_x.append(format(rand_val_x, '3.6f'))
        rand_val_str_y.append(format(rand_val_y, '3.6f'))

    coordinates=list(zip(rand_val_str_x,rand_val_str_y))
    # print(coordinates)
    filtered_coordinates = []
    for coord in coordinates:
        if distance(origin, coord).km <= radius:
            filtered_coordinates.append(coord)
    gmaps = googlemaps.Client(api_key)

    m = folium.Map(location=origin, zoom_start=14)

    folium.Marker(location=origin, tooltip='Origin').add_to(m)

    for coord in filtered_coordinates:
        address = gmaps.reverse_geocode(coord)[0]['formatted_address']

        folium.Marker(location=coord, tooltip=address).add_to(m)
    m
    #print(filtered_coordinates)
    distance = {}
    for coord in filtered_coordinates:
        distance[coord] = geodesic(origin, coord).miles
    # sort the coordinates based on their distance from the origin
    sorted_coords = sorted(filtered_coordinates, key=lambda coord: distance[coord])
    for item in sorted_coords:
        print (item,distance[item])
    url = f'https://www.google.com/maps/dir/?api=1&origin={sorted_coords[0]}&destination={origin}'
    updatedurl=url.replace(" ","").replace("'","")
    return updatedurl

if __name__ == '__main__':
    app.run()