#!/usr/bin/python

import MySQLdb
from time import gmtime, strftime
# hour = strftime("%H", gmtime())
# minute = strftime("%M", gmtime())
# second = strftime("%S", gmtime())
# print hour + " " + minute + " " + second

#connect to db

#find entry where current time greater than or equal to that field limit 1

#check the stage

#find the row after leaving an extra cycle

#delete all rows greater than that row

#find time in last row

#check other table for plan (our time less than end time limit 1) and start writing

#write until time at end of cycle is less than that plan's end time

#write next plan until all of other table is complete

def compareTime(hourOfTime, endHour, minOfTime, endMin, secOfTime, endSec):
	if(hourOfTime < endHour):
		return 1;
	if(hourOfTime == endHour):
		if(minOfTime < endMin):
			return 1;
		if(minOfTime == endMin):
			if(secOfTime < endSec):
				return 1;
			if(secOfTime == endSec):
				return 0;
			else:
				return 0;
		else:
			return 0;
	else:
		return 0;

tisdb = MySQLdb.connect("localhost","root","root","tis" )
tiscursor = tisdb.cursor()

ug405db = MySQLdb.connect("localhost","root","root","ug405" )
ug405cursor = ug405db.cursor()

ug405duplicatedb = MySQLdb.connect("localhost","root","root","ug405_duplicate" )
ug405duplicatecursor = ug405duplicatedb.cursor()

sql = "SELECT * FROM `utmc_traffic_signal_static` WHERE 1"

try:
	tiscursor.execute(sql)
   	results = tiscursor.fetchall()
   	for signal in results:
   		scnId = signal[1]
   		signalId = signal[0]
   		groupId = signal[3]
   		endOfDay = 0
   		totalSeconds = 0
   		pintoupdatesql = "SELECT `NextStagePin` FROM `utmc_traffic_signal_dynamic` WHERE `SystemCodeNumber`='%s' LIMIT 1" % (scnId)
   		tiscursor.execute(pintoupdatesql)
   		pinToUpdate = tiscursor.fetchall()[0][0]

   		try:
	   		readug405sql = "SELECT * FROM `utcControlTable` WHERE `site_id` = '%d' LIMIT 1" % (signalId)
	   		ug405cursor.execute(readug405sql)
	   		firstRowug405 = ug405cursor.fetchall()
	   		firstRowId = firstRowug405[0][0]
	   		readug405duplicatesql = "SELECT * FROM `utcControlTable` WHERE `originalid` = '%d' LIMIT 1" % (firstRowId)
	   		ug405duplicatecursor.execute(readug405duplicatesql)
	   		correspondingRowug405duplicate = ug405duplicatecursor.fetchall()
	   		currentStageInDb = correspondingRowug405duplicate[0][22]
	   		totalStagesInDb = correspondingRowug405duplicate[0][23]
	   		noOfMercyRows = totalStagesInDb + (totalStagesInDb - currentStageInDb) + 1
	   		firstnrowsug405sql = "SELECT * FROM `utcControlTable` WHERE `site_id` = '%d' LIMIT %d" % (signalId, noOfMercyRows)
	   		ug405cursor.execute(firstnrowsug405sql)
	   		firstnrows = ug405cursor.fetchall()
	   		lastrowid = firstnrows[noOfMercyRows-1][0]
	   		lastrowsec = firstnrows[noOfMercyRows-1][2]
	   		lastrowlastupdated = firstnrows[noOfMercyRows-1][22]
	   		lastrowlastupdatedsec = int(lastrowlastupdated.strftime("%S"))
	   		lastrowlastupdatedmin = int(lastrowlastupdated.strftime("%M"))
	   		lastrowlastupdatedhour = int(lastrowlastupdated.strftime("%H"))
	   		lastrowsechour = lastrowsec / 3600
			lastrowsecmin = (lastrowsec / 60) - (lastrowsechour * 60)
			lastrowsecsec = lastrowsec - (lastrowsecmin * 60) - (lastrowsechour * 3600)
			finaltimehour = lastrowsechour + lastrowlastupdatedhour
			finaltimemin = lastrowsecmin + lastrowlastupdatedmin
			finaltimesec = lastrowsecsec + lastrowlastupdatedsec
			currenttimehour = int(strftime("%H", gmtime()))
			currenttimeminute = int(strftime("%M", gmtime()))
			currenttimesecond = int(strftime("%S", gmtime()))
			differenceinhour = finaltimehour - currenttimehour
			differenceinmin = finaltimemin - currenttimeminute
			differenceinsec = finaltimesec - currenttimesecond
			totalaheadseconds = (differenceinhour * 3600) + (differenceinmin * 60) + differenceinsec
			totalSeconds = totalaheadseconds
			deleteallexceptfirstnrowssql = "DELETE FROM `utcControlTable` WHERE `site_id` = '%d' AND `id` > '%d'" % (signalId, lastrowid)
			ug405cursor.execute(deleteallexceptfirstnrowssql)
			ug405db.commit()

		except:
			print "DB is empty"
   		hour = strftime("%H", gmtime())
		minute = strftime("%M", gmtime())
		second = strftime("%S", gmtime())
   		currentTime = hour + ":" + minute + ":" + second

   		try:
   			while(endOfDay == 0):
   				sql2 = "SELECT `stage`.`StageOrder`,`stage`.`Time`,`stage`.`VehicleMovements`,`plan`.`PlanID`,`plan`.`EndTime`,(SELECT GROUP_CONCAT( LinkName SEPARATOR  ';' ) FROM  `utmc_traffic_signal_static_links` WHERE  `SignalID` = '%d') AS `LinkNames` FROM `utmc_traffic_signal_plans_stages` AS `stage` INNER JOIN `utmc_traffic_signal_groups_plans` AS `plan` ON `plan`.`PlanID` = `stage`.`PlanID`WHERE '%s' BETWEEN `plan`.`StartTime` AND `plan`.`EndTime` AND `plan`.`GroupID` = '%d' AND `stage`.`SignalID` = '%d'" % (signalId ,currentTime, groupId, signalId)
	   			tiscursor.execute(sql2)
	   			results2 = tiscursor.fetchall()
	   			endTime = results2[0][4]
	   			endTotalSec = endTime.seconds
	   			endHour = endTotalSec / 3600
	   			endMin = (endTotalSec / 60) - (endHour * 60)
	   			endSec = endTotalSec - (endMin * 60) - (endHour * 3600)
	   			noOfStages = len(results2)
	   			currentStage = 1
	   			secOfTime = int(second)
	   			minOfTime = int(minute)
	   			hourOfTime = int(hour)
	   			if(endHour == 0):
	   				endHour = 24
	   			while(compareTime(hourOfTime, endHour, minOfTime, endMin, secOfTime, endSec)):
	   				secondsToNextStage = results2[currentStage-1][1]
	   				totalSeconds = totalSeconds + secondsToNextStage
	   				secondsDifference = ((int(strftime("%H", gmtime())) - int(hour)) * 3600) + ((int(strftime("%M", gmtime())) - int(minute)) * 60) + (int(strftime("%S", gmtime())) - int(second))
	   				secondsToWrite = totalSeconds - secondsDifference
	   				finalSecondsToWrite = (int(strftime("%H", gmtime())) * 3600) + (int(strftime("%M", gmtime())) * 60) + int(strftime("%S", gmtime())) + secondsToWrite + 2
	   				insertug405sql = "INSERT INTO `utcControlTable`(`site_id`, `utcControlTimeStamp`, %s) VALUES ('%d', '%d', 1)" % (pinToUpdate, signalId, finalSecondsToWrite)
	   				ug405cursor.execute(insertug405sql)
	   				ug405db.commit()
	   				#inserting 0 after 1 sec
	   				
	   				insertug405copysql = "INSERT INTO `utcControlTable_copy`(`site_id`, `utcControlTimeStamp`, %s) VALUES ('%d', '%d', 1)" % (pinToUpdate, signalId, finalSecondsToWrite)
	   				ug405cursor.execute(insertug405copysql)
	   				ug405db.commit()
	   				
	   				#inserting 0 after 1 sec
	   				insertug405stopsql = "INSERT INTO `utcControlTable`(`site_id`, `utcControlTimeStamp`, %s) VALUES ('%d', '%d', 0)" % (pinToUpdate, signalId, (finalSecondsToWrite+5))
	   				ug405cursor.execute(insertug405stopsql)
	   				ug405db.commit()

	   				insertug405copystopsql = "INSERT INTO `utcControlTable_copy`(`site_id`, `utcControlTimeStamp`, %s) VALUES ('%d', '%d', 0)" % (pinToUpdate, signalId, (finalSecondsToWrite+5))
	   				ug405cursor.execute(insertug405copystopsql)
	   				ug405db.commit()

	   				originalid = ug405cursor.lastrowid
	   				insertug405duplicatesql = "INSERT INTO `utcControlTable`(`originalid`, `current_stage`, `total_stages`) VALUES ('%d', '%d', '%d')" % (originalid, currentStage, noOfStages)
	   				ug405duplicatecursor.execute(insertug405duplicatesql)
	   				ug405duplicatedb.commit()
	   				#write to db now
	   				currentStage = currentStage + 1
	   				if currentStage > noOfStages:
	   					currentStage = 1  
	   				secOfTime = secOfTime + secondsToNextStage
	   				while(secOfTime >= 60):
	   					minOfTime = minOfTime + 1
	   					secOfTime = secOfTime - 60
	   				while(minOfTime >= 60):
	   					hourOfTime = hourOfTime + 1
	   					minOfTime = minOfTime - 60

	   			#wait to finish cycle
	   			while(currentStage != noOfStages):
	   				secondsToNextStage = results2[currentStage-1][1]
	   				totalSeconds = totalSeconds + secondsToNextStage
	   				secondsDifference = ((int(strftime("%H", gmtime())) - int(hour)) * 3600) + ((int(strftime("%M", gmtime())) - int(minute)) * 60) + (int(strftime("%S", gmtime())) - int(second))
	   				secondsToWrite = totalSeconds - secondsDifference
	   				finalSecondsToWrite = (int(strftime("%H", gmtime())) * 3600) + (int(strftime("%M", gmtime())) * 60) + int(strftime("%S", gmtime())) + secondsToWrite + 2
	   				insertug405sql = "INSERT INTO `utcControlTable`(`site_id`, `utcControlTimeStamp`, %s) VALUES ('%d', '%d', 1)" % (pinToUpdate, signalId, finalSecondsToWrite)
	   				ug405cursor.execute(insertug405sql)
	   				ug405db.commit()
	   				#inserting 0 after 1 sec
	   				
	   				insertug405copysql = "INSERT INTO `utcControlTable_copy`(`site_id`, `utcControlTimeStamp`, %s) VALUES ('%d', '%d', 1)" % (pinToUpdate, signalId, finalSecondsToWrite)
	   				ug405cursor.execute(insertug405copysql)
	   				ug405db.commit()
	   				
	   				# inserting 0 after 1 sec
	   				insertug405stopsql = "INSERT INTO `utcControlTable`(`site_id`, `utcControlTimeStamp`, %s) VALUES ('%d', '%d', 0)" % (pinToUpdate, signalId, (finalSecondsToWrite+5))
	   				ug405cursor.execute(insertug405stopsql)
	   				ug405db.commit()
	   				
	   				insertug405copystopsql = "INSERT INTO `utcControlTable_copy`(`site_id`, `utcControlTimeStamp`, %s) VALUES ('%d', '%d', 0)" % (pinToUpdate, signalId, (finalSecondsToWrite+5))
	   				ug405cursor.execute(insertug405copystopsql)
	   				ug405db.commit()
	   				
	   				originalid = ug405cursor.lastrowid
	   				insertug405duplicatesql = "INSERT INTO `utcControlTable`(`originalid`, `current_stage`, `total_stages`) VALUES ('%d', '%d', '%d')" % (originalid, currentStage, noOfStages)
	   				ug405duplicatecursor.execute(insertug405duplicatesql)
	   				ug405duplicatedb.commit()
	   				#write to db now
	   				currentStage = currentStage + 1;
	   				secOfTime = secOfTime + secondsToNextStage
	   				while(secOfTime >= 60):
	   					minOfTime = minOfTime + 1
	   					secOfTime = secOfTime - 60
	   				while(minOfTime >= 60):
	   					hourOfTime = hourOfTime + 1
	   					minOfTime = minOfTime - 60
	   			currentTime = str(hourOfTime) + ":" + str(minOfTime) + ":" + str(secOfTime)
	   			if(endHour == 24 and endMin == 0 and endSec == 0):
	   				endOfDay = 1	   		
		except:
   			print "Error: unable to fetch data 2"
except:
   	print "Error: unable to fetch data"
