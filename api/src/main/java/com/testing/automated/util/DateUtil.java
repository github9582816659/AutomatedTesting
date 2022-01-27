package com.testing.automated.util;

import java.time.Instant;
import java.time.ZoneId;
import java.time.ZonedDateTime;
import java.util.Date;

public class DateUtil {

    public static Date getCurrentDateTime() {
        ZoneId zoneId = ZoneId.of("Europe/Zurich");
        Instant instant = Instant.now();
        ZonedDateTime zonedDateTime = instant.atZone(zoneId);
        Date date = Date.from(zonedDateTime.toInstant());
        return date;
    }
}
