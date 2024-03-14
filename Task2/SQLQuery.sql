WITH RecursiveSubdivisions AS (
    SELECT id, name, parent_id, 0 AS division_level
    FROM [testdb].[dbo].[subdivisions]
    WHERE parent_id IS NULL
    
    UNION ALL
    
    SELECT s.id, s.name, s.parent_id, rs.division_level + 1
    FROM [testdb].[dbo].[subdivisions] AS s
    INNER JOIN RecursiveSubdivisions AS rs ON s.parent_id = rs.id
)
SELECT 
    c.id AS 'id',
    c.name AS 'name',
    s.name AS 'sub_name',
    s.id AS 'sub_id',
    rs.division_level AS 'sub_level',
    COUNT(*) OVER(PARTITION BY s.id) AS 'colls_count'
FROM [testdb].[dbo].[collaborators] AS c 
LEFT JOIN  [testdb].[dbo].[subdivisions] AS s ON c.subdivision_id = s.id
LEFT JOIN RecursiveSubdivisions AS rs ON s.id = rs.id
WHERE c.age < 40 AND c.subdivision_id NOT IN (100055, 100059)
ORDER BY sub_level;
