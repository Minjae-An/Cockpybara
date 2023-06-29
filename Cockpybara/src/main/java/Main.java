import com.opencsv.CSVReader;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileReader;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class Main {
    private static HashMap<String, ArrayList<String>> map = new HashMap<>();
    private static HashSet<String> units = new HashSet<>();
    private static HashSet<String> glass = new HashSet<>();
    public static void main(String[] args) throws CsvValidationException, IOException {
        String csvFile = "Cockpybara/src/main/resources/all_drinks.csv"; // 읽을 CSV 파일의 경로

        try (CSVReader reader = new CSVReader(new FileReader(csvFile))) {
            String[] nextLine =  reader.readNext();


            while ((nextLine = reader.readNext()) != null) {
                glass.add(nextLine[7]);
                for (int i = 9; i <= 23; i++) {

                    String ingredient = nextLine[i];
                    if (ingredient == null || ingredient.trim().equals("")){
                        continue;
                    }
                    //25 - 39

                    String measure = nextLine[i + 16];
                    if (measure.equals("\n")) continue;
                    ArrayList<String> list;
                    if ((list = map.get(ingredient)) != null) {

                    }
                    else {
                        list = new ArrayList<>();
                    }

                    int startIdx = measure.indexOf(" ");
                    String unit;
                    if (startIdx != -1) {
                        unit = measure.substring(startIdx).trim();
                        while (unit.contains("/")) {
                            startIdx = measure.indexOf(" ", startIdx + 1);
                            unit = measure.substring(startIdx).trim();
                        }
                    }
                    else {
                        unit = measure.trim();
                    }
                    if (!list.contains(unit)) {
                        units.add(unit);
                        list.add(unit);
                    }

                    map.put(ingredient, list);


                }


//                int i = 0;
//                for (String cell : nextLine) {
//                    System.out.print(i++ + " : " + cell + "\n");
//                }
//                System.out.println();
            }
        } catch (IOException e) {
            e.printStackTrace();
        }

        for (String s : glass) {
            System.out.println(s + ",");
        }

        System.out.println(glass.size());

//        for (String s : units) {
//            System.out.println(s + ",");
//        }
//
//        System.out.println(units.size());

//        for (Map.Entry<String, ArrayList<String>> en : map.entrySet()) {
//            System.out.println(en);
//        }

//        System.out.println(map);
    }
}
