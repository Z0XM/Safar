import streamlit as st
from PIL import Image
import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

st.title("Safety Features")
decision = st.sidebar.radio("Choose",("Driver background Check","Vehicel Inspection","Insurance Coverage"))

if decision=="Vehicel Inspection":
    st.header("Check the Vehicle condition")
    view_btn = st.button("View Vehical Inspection Report")
    
    if view_btn:
        st.image('emission_report/Emissions-Vehicle-Inspection-Report.jpg')
        
    with open("emission_report/Emissions-Vehicle-Inspection-Report.jpg", "rb") as file:
        btn = st.download_button(
                label="Download Vehical Inspection Report",
                data=file,
                file_name="Emissions-Vehicle-Inspection-Report.jpg",
                mime="image/png"
            )
        
elif decision == 'Driver background Check':
    data = pd.read_csv('driver_background.csv')
    st.header("Available Drivers")
    st.dataframe(data)
    
    fig, ax = plt.subplots()
    ax.set_title("Total Kilometers travelled in Day Time")
    ax.bar(data['Name'],data['TotalKms_Day'])
    st.pyplot(fig)
    
    fig, ax = plt.subplots()
    ax.set_title("Total Kilometers travelled in Night Time")
    ax.bar(data['Name'],data['TotalKms_Night'])
    st.pyplot(fig)
    
    st.header("Select the Driver name to check Background details")
    choice = st.radio("Pick your driver",data['Name'].unique())
    
    st.markdown("#### Profile picture")
    st.image(data[data['Name'] == choice]['img'].values[0])
    
    message = f"The driver name is {choice}, the total raids done by Driver are: {data[data['Name']==choice]['TotalRaids'].values[0]}"
    st.markdown(f"#### {message}")
    st.markdown(f"#### Criminal Record: {data[data['Name']==choice]['Criminal'].values[0]}")
    
    given_data = data[data['Name']==choice]['License'].values[0]
    
    st.markdown(f"#### License Expiry: {given_data}")
    
    with open("mvr/download.jpeg", "rb") as file:
        btn = st.download_button(
                label="Download Motor Vehicle Report",
                data=file,
                file_name="mvr.jpg",
                mime="image/png"
            )
else:
    with open("insurance/live.pdf", "rb") as file:
        btn = st.download_button(
                label="Download Life Insurance Coverage",
                data=file,
                file_name="live.pdf",
                mime="application/pdf"
            )
    with open("insurance/auto.pdf", "rb") as file:
        btn = st.download_button(
                label="Download Auto Insurance Coverage",
                data=file,
                file_name="auto.pdf",
                mime="application/pdf"
            )
