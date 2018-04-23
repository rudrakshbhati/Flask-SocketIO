from flask import Flask
from flask import Flask, render_template,jsonify,json, request
from flask_socketio import SocketIO, send

app = Flask(__name__)
app.config['DEBUG'] = True
app.config['SECRET_KEY'] = 'thishastobeverylong'


socketio = SocketIO(app)


@app.route('/')
def index():
    return render_template('view.html')

@socketio.on('message')
def message(msg):
    send(msg,broadcast = True)



if __name__ == '__main__':
    socketio.run(app)


