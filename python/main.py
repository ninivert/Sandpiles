from math import *
import numpy
import cv2
from PIL import Image

#
# Options
#

WIDTH = 21
HEIGHT = 21
MIDWIDTH = floor(WIDTH/2)
MIDHEIGHT = floor(HEIGHT/2)

PALETTES = {
	'warm': [
		(247, 241, 227),
		(112, 111, 211),
		(71, 71, 135),
		(64, 64, 122),
		(44, 44, 84)
	],
	'greyscale': [
		(255, 255, 255),
		(191, 191, 191),
		(127, 127, 127),
		(63, 63, 63),
		(0, 0, 0)
	],
	'colored': [
		(0, 0, 0),
		(255, 255, 255),
		(255, 0, 0),
		(0, 255, 0),
		(0, 0, 255)
	]
}

COLORSCHEME = 'colored'
PALETTE = PALETTES[COLORSCHEME]

ITERATIONS = 40
FPS = 30

# MP4 setting
# VIDEOFOURCC = cv2.VideoWriter_fourcc(*'MJPG')
# VIDEOFORMAT = 'mp4'

# AVI lossless setting
VIDEOFOURCC = cv2.VideoWriter_fourcc(*'DIB ') # Lets you choose lossless
VIDEOFORMAT = 'avi'

# MKV lossless setting
# VIDEOFOURCC = cv2.VideoWriter_fourcc(*'XVID')
# VIDEOFORMAT = 'mkv'


#
# Setup
#

grid = []
tempgrid = []
img = Image.new('RGB', (WIDTH, HEIGHT), (255, 255, 255))

def init():
	# Create an empty HEIGHTxWIDTH array
	for y in range(HEIGHT):
		grid.append([])
		tempgrid.append([])
		for x in range(WIDTH):
			grid[y].append(0)
			tempgrid[y].append(0)

	grid[MIDHEIGHT][MIDWIDTH] = inf

#
# The math!
#

def update():
	# Copy grid to tempgrid
	# Doing the for-loop is faster than the deepcopy
	for y in range(HEIGHT):
		for x in range(WIDTH):
			tempgrid[y][x] = grid[y][x]
	
	# Topple grid
	for y in range(1, HEIGHT-1):
		for x in range(1, WIDTH-1):
			n = tempgrid[y][x]
			if n>3:
				grid[y][x] -= 4
				grid[y-1][x] += 1
				grid[y+1][x] += 1
				grid[y][x-1] += 1
				grid[y][x+1] += 1


#
# Drawing part
#

def draw():
	data = []

	for y in range(HEIGHT):
		for x in range(WIDTH):
			n = grid[y][x]
			data.append(PALETTE[n] if n < 4 else PALETTE[4])

	img.putdata(data)

#
# Find diameter of the figure
#

def getDiameter():
	longest = grid[MIDHEIGHT]
	for i in range(len(longest)):
		if not longest[i] == 0:
			return WIDTH - 2*i + 1
			break
	

#
# Start
#

init()

print("Starting writing video")

# AVI video format did not work because of the 4GB file limitation
title = f"video (n={str(ITERATIONS)}, fps={str(FPS)}, {WIDTH}x{HEIGHT}, {COLORSCHEME}).{VIDEOFORMAT}"
video = cv2.VideoWriter(title, VIDEOFOURCC, FPS, (WIDTH, HEIGHT))

for i in range(ITERATIONS):
	# Log progress to user
	if i%(ITERATIONS/100) == 0: print(str(floor(i/ITERATIONS*100)) + "% done")

	# Do its thing
	update()
	draw()
	video.write(numpy.array(img))

cv2.destroyAllWindows()
video.release()

print("Finished writing video")