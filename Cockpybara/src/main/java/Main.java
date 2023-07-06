import com.opencsv.CSVReader;
import com.opencsv.CSVWriter;
import com.opencsv.exceptions.CsvValidationException;

import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;

public class Main {
    private static HashMap<String, ArrayList<String>> map = new HashMap<>();
    private static HashSet<String> units = new HashSet<>();
    private static HashSet<String> glass = new HashSet<>();
    public static void main(String[] args) throws CsvValidationException, IOException {
        String csvFile = "src\\main\\resources\\all_drinks.csv"; // 읽을 CSV 파일의 경로

        //csv파일 수정 - 비슷한 단위들 단일화
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

                    //단위 변경 코드 추가
                    if (measure.contains("oz")) measure = "oz"; //온즈(1oz = 30ml)
                    if (measure.contains("ml")) measure = "ml";
                    if (measure.contains("tblsp")) measure = "tblsp "; //숟가락(큰술)
                    if (measure.contains("tsp")) measure = "tsp"; //작은 숟가락
                    if (measure.contains("cup")) measure = "cup";
                    if (measure.contains("shot")) measure = "shot";
                    if (measure.contains("cl")) measure = "cl"; //센티리터
                    if (measure.contains("shot")) measure = "shot";
                    if (measure.contains("inch")) measure = "inch";  //길이 inch
                    if (measure.contains("glass")) measure = "glass";
                    if (measure.contains("bottle ")) measure = "bottle ";
                    if (measure.contains("lb")) measure = "lb"; //파운드(1lb = 0.45kg)
                    if (measure.contains("gal")) measure = "gal";

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
        //시험용 코드 - 파일 잘 바뀌고 출력잘되는지 여기서 확인할것, 코드 추가해야함!
        for (String s : glass) {
            System.out.println(s + ",");
        }

        System.out.println(glass.size());

        //위에 수정된 내용을 토대로 새로운 재료 ingredients.csv파일 생성
        String outputCsvFile = "src/main/resources/all_ingredients.csv"; // 저장할 CSV 파일의 경로

        try (CSVWriter writer = new CSVWriter(new FileWriter(outputCsvFile))) {
            // 헤더 라인 작성
            String[] header = { "Ingredient", "Unit" };
            writer.writeNext(header);

            // 데이터 작성
            for (HashMap.Entry<String, ArrayList<String>> entry : map.entrySet()) {
                String ingredient = entry.getKey();
                ArrayList<String> units = entry.getValue();

                for (String unit : units) {
                    String[] data = { ingredient, unit };
                    writer.writeNext(data);
                }
            }

            System.out.println("all_ingredients.csv 파일이 생성되었습니다.");
        } catch (IOException e) {
            e.printStackTrace();
        }

        //

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
