package com.tknkservice.service.controller;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;
import net.sf.json.JSONObject;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.*;

@RestController
@RequestMapping(value = "/api/reports")
public class ReportController {

    @Value("${spring.datasource.url}")
    private String jdbcUrl;

    @Value("${spring.datasource.username}")
    private String username;

    @Value("${spring.datasource.password}")
    private String password;

    //encodeURIComponent('{"starDate":"15.11.2023 00:00:00","endDate":"15.11.2023 23:59:59"}')
    //http://localhost:8080/reports/?reportName=report&fileType=pdf&json=%7B%22startDate%22%3A%2215.11.2023%2000%3A00%3A00%22%2C%22endDate%22%3A%2215.11.2023%2023%3A59%3A59%22%7D

    @GetMapping
    public ResponseEntity<byte[]> getReport(@RequestParam String reportName, @RequestParam String json, @RequestParam String fileType) throws IOException {
        try {
            Map<String, Object> parameters = new HashMap<>();
            if (json != null && !json.equals("")) {
                JSONObject jsonObj = new JSONObject().fromObject(json);
                for (Iterator it = jsonObj.keys(); it.hasNext(); ) {
                    String key = (String) it.next();
                    if (key.contains("id")) {
                        parameters.put(key, Long.valueOf(jsonObj.get(key).toString()));

                    } else {
                        parameters.put(key, jsonObj.get(key));
                    }
                }
            }

            Connection connection = DriverManager.getConnection(jdbcUrl, username, password);
            List<JasperPrint> jasperPrintList = new ArrayList<>();

                String reportPath = new ClassPathResource("/reports/" + reportName + ".jasper").getURL().getPath();
                //String reportPath = "./report/" + reportName + ".jasper";
                JasperReport jasperReport = (JasperReport) JRLoader.loadObjectFromFile(reportPath);
                jasperPrintList.add(JasperFillManager.fillReport(jasperReport, parameters, connection));


            HttpHeaders headers = new HttpHeaders();
            String outputFileName = "";
            ByteArrayOutputStream aStream = new ByteArrayOutputStream();
            // PDF'e dönüştürme
            if (fileType == null || fileType.equals("") || fileType.toLowerCase().equals("pdf")) {
                JRPdfExporter exporter = new JRPdfExporter();
                exporter.setExporterInput(SimpleExporterInput.getInstance(jasperPrintList));
                exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(aStream));
                exporter.exportReport();
                headers.setContentType(MediaType.APPLICATION_PDF);
                outputFileName = reportName + ".pdf";
            }
            // Excel'e dönüştürme
            if (fileType.toLowerCase().equals("xls") || fileType.toLowerCase().equals("xlsx")) {
                JRXlsExporter exporter = new JRXlsExporter();
                exporter.setExporterInput(SimpleExporterInput.getInstance(jasperPrintList));
                exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(aStream));
                exporter.exportReport();
                headers.setContentType(MediaType.APPLICATION_XML);
                outputFileName = reportName + ".xls";
            }

            byte[] pdfBytes = aStream.toByteArray();

            headers.setContentDispositionFormData("inline", outputFileName);
            return ResponseEntity.ok().headers(headers).body(pdfBytes);

        } catch (JRException | SQLException e) {
            e.printStackTrace();
            // Handle exception
            return ResponseEntity.status(500).build();
        }
    }

}